import { defineStore } from 'pinia'

export const usePartiesStore = defineStore('parties', {
  state: () => {
    return {
      parties: [
        {
          name: 'VVD',
          senate_seats: 10,
          parliament_projected: 27,
          does_not_rule_with: []
        },
        {
          name: 'BBB',
          senate_seats: 16,
          parliament_projected: 6,
          does_not_rule_with: []
        },
        {
          name: 'NSC',
          senate_seats: 0,
          parliament_projected: 21
        },
        {
          name: 'GLPvdA',
          senate_seats: 14,
          parliament_projected: 27,
          does_not_rule_with: ['PVV', 'FvD']
        },
        {
          name: 'CDA',
          senate_seats: 6,
          parliament_projected: 4,
          does_not_rule_with: []
        },
        {
          name: 'D66',
          senate_seats: 5,
          parliament_projected: 8,
          does_not_rule_with: ['PVV', 'FvD']
        },
        {
          name: 'PVV',
          senate_seats: 4,
          parliament_projected: 26,
          does_not_rule_with: []
        },
        {
          name: 'SP',
          senate_seats: 3,
          parliament_projected: 6,
          does_not_rule_with: []
        },
        {
          name: 'CU',
          senate_seats: 3,
          parliament_projected: 4,
          does_not_rule_with: []
        },
        {
          name: 'PvdD',
          senate_seats: 3,
          parliament_projected: 5,
          does_not_rule_with: []
        },
        {
          name: 'JA21',
          senate_seats: 3,
          parliament_projected: 2,
          does_not_rule_with: []
        },
        {
          name: 'FvD',
          senate_seats: 2,
          parliament_projected: 4,
          does_not_rule_with: []
        },
        {
          name: 'Volt',
          senate_seats: 2,
          parliament_projected: 3,
          does_not_rule_with: []
        },
        {
          name: 'SGP',
          senate_seats: 2,
          parliament_projected: 3,
          does_not_rule_with: []
        },
        {
          name: 'OSF',
          senate_seats: 1,
          parliament_projected: 0,
          does_not_rule_with: []
        },
        {
          name: '50+',
          senate_seats: 1,
          parliament_projected: 0,
          does_not_rule_with: []
        },
        {
          name: 'DENK',
          senate_seats: 0,
          parliament_projected: 3,
          does_not_rule_with: []
        },
        {
          name: 'BVNL',
          senate_seats: 0,
          parliament_projected: 1,
          does_not_rule_with: []
        }
      ]
    }
  },

    getters: {
        sortedParties: (state) => {
            return state.parties.sort((a, b) => {
                return b.parliament_projected - a.parliament_projected;
            });
        },
        coalitions: (state) => {
            const minimumSeats = 76;
            const minimumSeatsSenate = 38;
            const maxParties = 6;

            const parties = state.parties
                .sort((a, b) => b.parliament_projected - a.parliament_projected);

            const coalitions = [];

            const generateCoalitions = (currentCoalition, startIndex, seats, seatsSenate) => {
                if (currentCoalition.length > 0 && seats >= minimumSeats && seatsSenate >= minimumSeatsSenate) {
                    // Check if the parties in the coalition are not ruling with each other
                    const rulingWith = currentCoalition.map(party => party.name);
                    const rulingWithParties = rulingWith.map(party => parties.find(p => p.name === party));
                    const rulingWithPartiesNames = rulingWithParties.map(party => party.does_not_rule_with).flat();

                    if (rulingWithPartiesNames.some(party => rulingWith.includes(party))) {
                        console.log(`Not ruling with each other: ${rulingWith.join(', ')}`)
                        return;
                    } else {
                        coalitions.push({
                            parties: currentCoalition.map(party => party.name).join(' + '),
                            seats,
                            seatsSenate
                        });
                    }
                }

                if (currentCoalition.length >= maxParties) {
                    return;
                }

                for (let i = startIndex; i < parties.length; i++) {
                    const party = parties[i];
                    if (party.parliament_projected >= 1) {
                        currentCoalition.push(party);
                        generateCoalitions(currentCoalition, i + 1, seats + party.parliament_projected, seatsSenate + party.senate_seats);
                        currentCoalition.pop();
                    }
                }
            };

            generateCoalitions([], 0, 0, 0);

            return coalitions;
        }
    },
})
