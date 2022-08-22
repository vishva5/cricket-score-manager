//variable
const table = document.querySelector("#history");
const pname = document.querySelector('#player');
const pmatch= document.querySelector('#match');
const prun= document.querySelector('#run');
const pball= document.querySelector('#ball-faced');
const psix= document.querySelector('#six');
const pfour= document.querySelector('#four');
const pover=document.querySelector('#over-bowled');
const pwicket=document.querySelector('#wicket');
const pcatch=document.querySelector('#catch');

//point system variable

const points={
    "six": 8,
    "four" : 5,
    "restRun" :1,
    "wicket" : 25,
    "catch" : 8
}
const btn = document.querySelector('#add');

console.log(btn);

let playerInfo = [];
getPlayerInfo();

btn.addEventListener('click', ()=>{
    let player = createPlayer();
    // console.log(player);
    let idx = findPlayer(player);
    if(idx==-1){
        addPlayerInfo(player);
    }
    else{
        updatePlayerInfo(idx);
    }
    location.reload();
});

function createPlayer(){
    ppoint = parseInt(psix.value)*points.six + parseInt(pfour.value)*points.four + (parseInt(prun.value)-6*parseInt(psix.value) -4*parseInt(pfour.value))*points.restRun + parseInt(pwicket.value)*points.wicket + parseInt(pcatch.value)*points.catch;
    let newPlayer ={
        "pname" : pname.value,
        "pmatch" : parseInt(pmatch.value) ,
        "prun" : parseInt(prun.value),
        "pball" : parseInt(pball.value),
        "psix" : parseInt(psix.value),
        "pfour" : parseInt(pfour.value),
        "pover" : parseInt(pover.value),
        "pwicket" : parseInt(pwicket.value),
        "pcatch" : parseInt(pcatch.value),
        "ppoint": ppoint
    }
    return newPlayer;
}
function findPlayer(player){
    if(playerInfo){
        for(let i = 0; i<playerInfo.length; i++){
            if(player.pname == playerInfo[i].pname){
                return i;
            }
        }

        return -1;
    }
    else{
        return -1;
    }
}
function getPlayerInfo(){
    if(localStorage.getItem("playerInfo")){
        playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
    }
}

function updatePlayerInfo(i){
    let oldMatch = parseInt(playerInfo[i].pmatch );
    let oldRun = parseInt(playerInfo[i].prun  );
    let oldBall = parseInt(playerInfo[i].pball );
    let oldSix = parseInt(playerInfo[i].psix );
    let oldFour = parseInt(playerInfo[i].pfour);
    let oldOver = parseInt(playerInfo[i].pover );
    let oldWicket = parseInt(playerInfo[i].pwicket );
    let oldCatch = parseInt(playerInfo[i].pcatch);

    oldMatch += parseInt(pmatch.value) ;
    oldRun += parseInt(prun.value);
    oldBall += parseInt(pball.value);
    oldSix += parseInt(psix.value);
    oldFour += parseInt(pfour.value);
    oldOver += parseInt(pover.value);
    oldWicket += parseInt(pwicket.value);
    oldCatch  += parseInt(pcatch.value);
    
    playerInfo[i].pmatch = oldMatch;
    playerInfo[i].prun = oldRun;
    playerInfo[i].pball =  oldBall;
    playerInfo[i].psix = oldSix;
    playerInfo[i].pfour = oldFour;
    playerInfo[i].pover = oldOver;
    playerInfo[i].pwicket = oldWicket;
    playerInfo[i].pcatch = oldCatch;
    
    console.log(oldRun);
    console.log(playerInfo[i]);
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}
function addPlayerInfo(newPlayer){
    console.log(playerInfo);
    playerInfo.push(newPlayer);
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
}
function compareFunction(player1, player2){
    return parseInt(player2.ppoint)-parseInt(player1.ppoint);
}
function careerHistory(){
    playerInfo.sort(compareFunction);
    console.log(playerInfo);
    for(let i = 0; i<playerInfo.length; i++){
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdMatches = document.createElement('td');
        let tdRuns = document.createElement('td');
        let tdBallFaced = document.createElement('td');
        let tdSixes = document.createElement('td');
        let tdFours = document.createElement('td');
        let tdOversBowled = document.createElement('td');
        let tdWickets = document.createElement('td');
        let tdCatches = document.createElement('td');
        let tdPoints = document.createElement('td');
        tdName.innerText=`${playerInfo[i].pname}`;
        tdMatches.innerText=`${playerInfo[i].pmatch}`;
        tdRuns.innerText=`${playerInfo[i].prun}`;
        tdBallFaced.innerText=`${playerInfo[i].pball}`;
        tdSixes.innerText=`${playerInfo[i].psix}`;
        tdFours.innerText=`${playerInfo[i].pfour}`;
        tdOversBowled.innerText=`${playerInfo[i].pover}`;
        tdWickets.innerText=`${playerInfo[i].pwicket}`;
        tdCatches.innerText=`${playerInfo[i].pcatch}`;
        tdPoints.innerText=`${playerInfo[i].ppoint}`;
        tr.appendChild(tdName);
        tr.appendChild(tdMatches);
        tr.appendChild(tdRuns);
        tr.appendChild(tdBallFaced);
        tr.appendChild(tdSixes);
        tr.appendChild(tdFours);
        tr.appendChild(tdOversBowled);
        tr.appendChild(tdWickets);
        tr.appendChild(tdCatches);
        tr.appendChild(tdPoints);
        table.appendChild(tr);
    }


}

window.onload = careerHistory();