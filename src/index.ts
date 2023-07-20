const leagueNames: string[] = ['English Premier League', 'Israeli Premier League', 'UEFA Europa League', 'Spanish La Liga', 'FIFA World Cup'];
const END_POINT: string = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l='

interface IFootballTeam {
    idTeam: string;
    strTeam: string;
    strTeamBadge?: string;
}

function initialLeagues(): void {
    const mainDiv: HTMLElement | null = document.getElementById("main");
    const leagueTitle: HTMLElement | null = document.getElementById("league-title");
    const backButton: HTMLElement | null = document.querySelector('.back-button');

    if(leagueTitle) leagueTitle.innerHTML=``


    if (backButton) {
        backButton.remove();
    }

    if (mainDiv) {
        mainDiv.innerHTML = '';
        leagueNames.forEach((leagueName, i) => {
            const btn = createElement('button', leagueName);
            btn.id = `league-button-${i}`;
            mainDiv.appendChild(btn);
            btn.addEventListener('click', () => displayTeamsByLeague(leagueName));
        });

        
    
    } else {
        console.error('Could not find element with id "main"');
    }
}

function createElement(tag: string, text: string): HTMLElement {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

async function displayTeamsByLeague(leagueName: string): Promise<void> {
    try {
        const teams = await fetchTeamsByLeague(leagueName);
        renderTeams(teams, leagueName);

        const backButton = createElement('button', 'Back');
        backButton.addEventListener('click', initialLeagues);
        backButton.className = 'back-button';
        document.body.appendChild(backButton);
        
    } catch (error) {
        console.error(`Failed to fetch teams for league: ${leagueName}. Error: ${error}`);
    }
}

async function fetchTeamsByLeague(leagueName: string): Promise<IFootballTeam[]> {
    const response = await fetch(`${END_POINT}${leagueName}`);
    const data = await response.json();

    if (Array.isArray(data.teams)) {
        return data.teams;
    } else {
        throw new Error('Invalid data format received from the server');
    }
}

function renderTeams(teams: IFootballTeam[], leagueName: string): void {
    const mainDiv: HTMLElement | null = document.getElementById("main");
    if (!mainDiv) return;
    const leagueTitle: HTMLElement | null = document.getElementById("league-title");

    mainDiv.innerHTML = '';
    if(leagueTitle) leagueTitle.innerHTML=`Teams in ${leagueName}`
    teams.forEach((team: IFootballTeam) => {
        const p = createElement('button', team.strTeam);
        mainDiv.appendChild(p);
    });

    const backButton = createElement('button', 'Back');
    backButton.addEventListener('click', initialLeagues);
}

initialLeagues();