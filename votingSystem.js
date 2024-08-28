// votingSystem.js

class VotingSystem {
    constructor() {
        // Initialize arrays to store voter IDs, candidate names, and votes
        this.voters = [];
        this.candidates = [];
        this.votes = [];
    }

    /**
     * Registers a new voter by adding their unique voterId to the voters array.
     * If the voter is already registered, it logs a message indicating so.
     * @param {string} voterId - The unique identifier for the voter.
     */
    registerVoter(voterId) {
        if (this.voters.includes(voterId)) {
            console.log(`Voter with ID ${voterId} is already registered.`);
        } else {
            this.voters.push(voterId);
            console.log(`Voter with ID ${voterId} has been registered successfully.`);
        }
    }

    /**
     * Adds a new candidate to the election by adding their name to the candidates array.
     * If the candidate is already in the election, it logs a message indicating so.
     * @param {string} candidateName - The name of the candidate.
     */
    addCandidate(candidateName) {
        if (this.candidates.includes(candidateName)) {
            console.log(`Candidate ${candidateName} is already in the election.`);
        } else {
            this.candidates.push(candidateName);
            console.log(`Candidate ${candidateName} has been added to the election.`);
        }
    }

    /**
     * Allows a registered voter to cast a vote for a candidate.
     * Ensures that the voter is registered, the candidate is in the election,
     * and the voter has not already voted.
     * @param {string} voterId - The unique identifier for the voter.
     * @param {string} candidateName - The name of the candidate.
     */
    castVote(voterId, candidateName) {
        if (!this.voters.includes(voterId)) {
            console.log(`Voter with ID ${voterId} is not registered.`);
            return;
        }

        if (!this.candidates.includes(candidateName)) {
            console.log(`Candidate ${candidateName} is not in the election.`);
            return;
        }

        if (this.votes.some(vote => vote.voterId === voterId)) {
            console.log(`Voter with ID ${voterId} has already voted.`);
            return;
        }

        // If all checks pass, the vote is recorded
        this.votes.push({ voterId, candidateName });
        console.log(`Voter with ID ${voterId} has voted for ${candidateName}.`);
    }

    /**
     * Counts the votes for each candidate and identifies the candidate with the most votes.
     * @returns {Object} An object containing the winner and the vote count for each candidate.
     */
    tallyVotes() {
        const voteCount = this.votes.reduce((count, vote) => {
            count[vote.candidateName] = (count[vote.candidateName] || 0) + 1;
            return count;
        }, {});

        const winner = Object.keys(voteCount).reduce((a, b) => voteCount[a] > voteCount[b] ? a : b);

        return { winner, voteCount };
    }

    /**
     * Displays the election results, including the total votes for each candidate,
     * the winner, and the total voter turnout.
     */
    displayResults() {
        const { winner, voteCount } = this.tallyVotes();

        if (Object.keys(voteCount).length > 0) {
            console.log("Election Results:");
            this.candidates.forEach(candidate => {
                console.log(`${candidate}: ${voteCount[candidate] || 0} votes`);
            });
            console.log(`Winner: ${winner} with ${voteCount[winner]} votes.`);
            console.log(`Total Voter Turnout: ${this.votes.length} out of ${this.voters.length} registered voters.`);
        } else {
            console.log("No votes have been cast.");
        }
    }
}

// Testing the VotingSystem class

function testVotingSystem() {
    console.log("=== Voting System Test ===");

    // Create an instance of VotingSystem
    const votingSystem = new VotingSystem();

    // Test voter registration
    console.log("\n--- Voter Registration ---");
    const voterIds = ["VOTER123", "VOTER456", "VOTER789", "VOTER101", "VOTER102"];
    voterIds.forEach(voterId => votingSystem.registerVoter(voterId));

    // Test adding candidates
    console.log("\n--- Adding Candidates ---");
    const candidates = ["John Doe", "Jane Smith", "Alice Johnson"];
    candidates.forEach(candidate => votingSystem.addCandidate(candidate));

    // Test casting votes
    console.log("\n--- Casting Votes ---");
    const votes = [
        ["VOTER123", "John Doe"],
        ["VOTER456", "Jane Smith"],
        ["VOTER789", "John Doe"],
        ["VOTER101", "Alice Johnson"],
        ["VOTER102", "Jane Smith"],
    ];
    votes.forEach(([voterId, candidateName]) => votingSystem.castVote(voterId, candidateName));

    // Test displaying results
    console.log("\n--- Displaying Results ---");
    votingSystem.displayResults();

    console.log("\n=== End of Test ===");
}

// Run the test
testVotingSystem();
