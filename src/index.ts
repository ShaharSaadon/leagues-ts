const leagueNames: string[] = ['English Premier League', 'Israeli Premier League', 'UEFA Europa League', 'Spanish La Liga', 'FIFA World Cup'];
const leaguesDiv: HTMLElement | null = document.getElementById("leagues");

interface ITeam {
    idTeam: string;
    strTeam: string;
    strTeamBadge: string;
}

async function fetchTeamsByLeague(leagueName: string) {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`);
        const data = await response.json();

        if (Array.isArray(data.teams)) {
            if (leaguesDiv) {
                leaguesDiv.innerHTML = '';
                const h4 = document.createElement('h4');
                h4.textContent = `Teams in ${leagueName}:`;
                leaguesDiv.appendChild(h4);

                data.teams.forEach((team: any) => {
                    if ('strTeam' in team) {
                        const p = document.createElement('p');
                        p.textContent = team.strTeam;
                        leaguesDiv.appendChild(p);
                    }
                });

                const backButton = document.createElement('button');
                backButton.textContent = 'Back';
                backButton.addEventListener('click', displayLeagueNames);
                leaguesDiv.appendChild(backButton);
            }
        } else {
            throw new Error('Invalid data format received from the server');
        }
    } catch (error) {
        console.error(`Failed to fetch teams for league: ${leagueName}. Error: ${error}`);
    }
}

function displayLeagueNames() {
    if (leaguesDiv) {
        leaguesDiv.innerHTML = '';
        leagueNames.forEach((leagueName, i) => {
            const btn = document.createElement('button');
            btn.textContent = leagueName;
            btn.id = `league-button-${i}`;
            leaguesDiv.appendChild(btn);
            btn.addEventListener('click', () => fetchTeamsByLeague(leagueName));
        });
    } else {
        console.error('Could not find element with id "leagues"');
    }
}

displayLeagueNames(); // Initial display