



class piece{
    constructor(){
        this.name;
        this.icon;
        this.color;
        this.id;
    }

    set Name(name){
        this.name = name;
    }
    set Icon(icon){
        this.icon = icon;
    }
    set Color(color){
        this.color = color;
    }
    set Id(id){
        this.id = id;
    }

    get Name(){
        return this.name;
    }
    get Icon(){
        return this.icon;
    }
    get Color(){
        return this.color;
    }
    get Id(){
        return this.id;
    }
}

class square{
    constructor(id){
        this.id = id;
        this.piece;
    }

    set Piece(piece){
        this.piece = piece;
    }
    set Id(id){
        this.id = id;
    }
    get Piece(){
        return this.piece;
    }
    get Id(){
        return this.id;
    }

}


class board{
    constructor(){
        this.blackKingCheck;
        this.whiteKingCheck;
        this.boardSetting = [];
        this.legalMoves;
        this.currentPlayer = 'white';
    }

    get BoardSetting(){
        return this.boardSetting;
    }

    get LegalMoves(){
        return this.legalMoves;
    }

    set LegalMoves(legalMoves){
        this.legalMoves = legalMoves;
    }

    get CurrentPlayer(){
        return this.currentPlayer;
    }

    get WhiteKingCheck(){
        return this.whiteKingCheck;
    }
    get BlackKingCheck(){
        return this.blackKingCheck;
    }

    emptyMoves(){

        this.legalMoves = [];
    }

    pushSquare(square){
        this.boardSetting.push(square);
    }

    initialBoardSetting(){
        //this.boardSetting = [];
        for(let i = 0; i < 16; i++){
            let newSquare = new square(i);
            let newPiece = new piece();
            newPiece.Name = blackSide[i].Name
            newPiece.Icon = blackSide[i].Icon;
            newPiece.Id = i;
            newPiece.Color = 'black';
            newSquare.piece = newPiece;
            this.boardSetting.push(newSquare);
        }
        for(let i = 0; i < 32; i++){
            let newSquare = new square(i + 16);
            this.boardSetting.push(newSquare);
        }
        for(let i = 0; i < 16; i++){
            let newSquare = new square(i + 48);
            let newPiece = new piece();
            newPiece.Name = whiteSide[i].Name;
            newPiece.Icon = whiteSide[i].Icon;
            newPiece.Id = i + 16;
            newPiece.Color = 'white';
            newSquare.piece = newPiece;
            this.boardSetting.push(newSquare);

        }
    }
    scanBoard(){
        this.emptyMoves();
        let pieceName;
        let pieceId;
        let pieceColor;
        let squareId;
        let targetSquareId;
        let targetSquare;
        let moveSet = new Array();
        moveSet = structuredClone(moveSetTemplate);
        this.boardSetting.forEach(square => {
        if(square.Piece != null){
            pieceName = square.Piece.Name;
            pieceId = square.Piece.Id;
            pieceColor = square.Piece.Color;
            squareId = square.Id;
            let currentRow = Math.floor((squareId/8) + 1);
            let remainingRowsAhead = 8 - currentRow;
            let remainingRowsBehind = currentRow - 1;
            let remainingColumnsAhead = ((currentRow * 8) - squareId) - 1;
            let remainingColumnsBehind = 7 - remainingColumnsAhead;
            let columsORRowsRemaining = 0;
            switch (pieceName){
                case 'pawn':
                    const initialPositionBlack = [8,9,10,11,12,13,14,15];
                    const initialPositionWhite = [48,49,50,51,52,53,54,55];
    
                    if(initialPositionBlack.includes(squareId) && this.boardSetting[squareId].Piece != null){
                        for(let i = 1; i < 3; i++){
                            targetSquareId = squareId + (8 * i);
                            targetSquare = this.boardSetting[targetSquareId];
                            if(targetSquare.Piece == null){
                            moveSet[pieceId].push(targetSquareId);   
                            }
                            else{
                                break;
                            }
                         }
                       }
                    else{
                        if(pieceColor == 'black'){
                             targetSquareId = squareId + 8;
                             targetSquare = this.boardSetting[targetSquareId];
                            if(targetSquare.Piece == null){
                                moveSet[pieceId].push(targetSquareId); 
                            }
                        }
                    }
                    if( pieceColor == 'black'){
                        targetSquareId = squareId + 8 + 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(targetSquare.Piece != null){
                            if(targetSquare.Piece.Color != 'black'){
                                moveSet[pieceId].push(targetSquareId);
                                if(targetSquare.Piece.Name == 'king'){
                                    this.whiteKingCheck = true;
                                } 
                            }
                        }
                    }

                    if(pieceColor == 'black'){
                        targetSquareId = squareId + 8 - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(targetSquare.Piece != null){
                            if(targetSquare.Piece.Color != 'black'){
                                moveSet[pieceId].push(targetSquareId);
                                if(targetSquare.Piece.Name == 'king'){
                                    this.whiteKingCheck = true;
                                }  
                            }
                        }
                    }      

                    if(initialPositionWhite.includes(squareId) && this.boardSetting[squareId].Piece != null){
                        for(let i = 1; i < 3; i++){
                            targetSquareId = squareId - (8 * i);
                            targetSquare = this.boardSetting[targetSquareId];
                            if(targetSquare.Piece == null){
                                moveSet[pieceId].push(targetSquareId);  
                            }
                            else{
                                break;
                            }
                        }
                    }
                    else{
                        if(pieceColor =='white'){
                            targetSquareId = squareId - 8;
                            targetSquare = this.boardSetting[targetSquareId];
                            if(targetSquare.Piece == null){
                                moveSet[pieceId].push(targetSquareId); 
                            }
                        }
                    }

                    if(pieceColor == 'white'){
                        targetSquareId = squareId - 8 + 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(targetSquare.Piece != null){
                            if(targetSquare.Piece.Color != 'white'){
                                moveSet[pieceId].push(targetSquareId); 
                                if(targetSquare.Piece.Name == 'king'){
                                    this.blackKingCheck = true;
                                } 
                            }
                        }
                    }             
                    if(pieceColor == 'white'){
                        targetSquareId = squareId - 8 - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(targetSquare.Piece != null){
                            if(targetSquare.Piece.Color != 'white'){
                                moveSet[pieceId].push(targetSquareId); 
                                if(targetSquare.Piece.Name == 'king'){
                                    this.blackKingCheck = true;
                                } 
                            }
                        }
                    }                             
                    break;
                case 'knight':
                    //Down Left Movement
                    if(remainingRowsAhead >= 2 && remainingColumnsBehind >= 1){
                        targetSquareId = squareId + (8 * 2) - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }
                    //Down Right Movement
                    if(remainingRowsAhead >= 2 && remainingColumnsAhead >= 1){
                        targetSquareId = squareId + (8 * 2) + 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }
                    //Up Left Movement
                    if(remainingRowsBehind >= 2 && remainingColumnsBehind >= 1){
                        targetSquareId = squareId - (8 * 2) - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }
                    //Up Right Movement
                    if(remainingRowsBehind >= 2 && remainingColumnsAhead >= 1){
                        targetSquareId = squareId - (8 * 2) + 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }       
                    //Left Up Movement
                    if(remainingRowsBehind >= 1 && remainingColumnsBehind >= 2){
                        targetSquareId = squareId - 8 - 2;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }   
                    //Left Down Movement
                    if(remainingRowsAhead >= 1 && remainingColumnsBehind >= 2){
                        targetSquareId = squareId + 8 - 2;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }                             
                    //Right Up Movement
                    if(remainingRowsBehind >= 1 && remainingColumnsAhead >= 2){
                    targetSquareId = squareId - 8 + 2;
                         targetSquare = this.boardSetting[targetSquareId];
                         this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }     
                    //Right Down Movement
                    if(remainingRowsAhead >= 1 && remainingColumnsAhead >= 2){
                        targetSquareId = squareId + 8 + 2;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }                                                                  
                    break;
                case 'bishop':
                    //Left Up Movement
                    if(remainingColumnsBehind < remainingRowsBehind){
                        columsORRowsRemaining = remainingColumnsBehind;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsBehind;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId - (8 * i) - i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }
                    //Right Up Movement
                    if(remainingColumnsAhead < remainingRowsBehind){
                        columsORRowsRemaining = remainingColumnsAhead;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsBehind;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId - (8 * i) + i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }
                    //Left Down Movement
                    if(remainingColumnsBehind < remainingRowsAhead){
                        columsORRowsRemaining = remainingColumnsBehind;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsAhead;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId + (8 * i) - i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }                    
                    //Right Down Movement
                    if(remainingColumnsAhead < remainingRowsAhead){
                        columsORRowsRemaining = remainingColumnsAhead;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsAhead;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId + (8 * i) + i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }                        
                    break;
                    case 'rook':
                    //Right
                    for(let i = 1; i <= remainingColumnsAhead; i++){
                        targetSquareId = squareId + i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }        
                    //Left
                    for(let i = 1; i <= remainingColumnsBehind; i++){
                        targetSquareId = squareId - i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }         
                    //Up       
                    for(let i = 1; i <= remainingRowsBehind; i++){
                        targetSquareId = squareId - (8 * i);
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }           
                    //Down
                    for(let i = 1; i <= remainingRowsAhead; i++){
                        targetSquareId = squareId + (8 * i);
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }                                                              
                    break;
                case 'queen':
                    //Right
                    for(let i = 1; i <= remainingColumnsAhead; i++){
                        targetSquareId = squareId + i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }        
                    //Left
                    for(let i = 1; i <= remainingColumnsBehind; i++){
                        targetSquareId = squareId - i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }         
                    //Up       
                    for(let i = 1; i <= remainingRowsBehind; i++){
                        targetSquareId = squareId - (8 * i);
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }           
                    //Down
                    for(let i = 1; i <= remainingRowsAhead; i++){
                        targetSquareId = squareId + (8 * i);
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }      
                    //Left Up Movement
                    if(remainingColumnsBehind < remainingRowsBehind){
                        columsORRowsRemaining = remainingColumnsBehind;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsBehind;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId - (8 * i) - i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }
                    //Right Up Movement
                    if(remainingColumnsAhead < remainingRowsBehind){
                        columsORRowsRemaining = remainingColumnsAhead;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsBehind;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId - (8 * i) + i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }
                    //Left Down Movement
                    if(remainingColumnsBehind < remainingRowsAhead){
                        columsORRowsRemaining = remainingColumnsBehind;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsAhead;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId + (8 * i) - i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }                    
                    //Right Down Movement
                    if(remainingColumnsAhead < remainingRowsAhead){
                        columsORRowsRemaining = remainingColumnsAhead;
                    }
                    else{
                        columsORRowsRemaining = remainingRowsAhead;
                    }
                    for(let i = 1; i <= columsORRowsRemaining; i++){
                        targetSquareId = squareId + (8 * i) + i;
                        targetSquare = this.boardSetting[targetSquareId];
                        if(!this.verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet)){
                            break;
                        }
                    }                                              
                    break;                    
                case 'king':
                    //Right Movement
                    if(remainingColumnsAhead >= 1){
                        targetSquareId = squareId +  1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }
                    //Left Movement
                    if(remainingColumnsBehind >= 1){
                        targetSquareId = squareId - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }        
                    //Up Movement
                    if(remainingRowsBehind >= 1){
                        targetSquareId = squareId - 8;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }        
                    //Down Movement
                    if(remainingRowsAhead >= 1){
                        targetSquareId = squareId + 8;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }        
                    //Up Left Movement
                    if(remainingRowsBehind >= 1 && remainingColumnsBehind >=1){
                        targetSquareId = squareId - 8 - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }  
                    //Up Right Movement
                    if(remainingRowsBehind >= 1 && remainingColumnsAhead >=1){
                        targetSquareId = squareId - 8 + 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }       
                    //Down Left Movement
                    if(remainingRowsAhead >= 1 && remainingColumnsBehind >=1){
                        targetSquareId = squareId + 8 - 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }             
                    //Down Right Movement
                    if(remainingRowsAhead >= 1 && remainingColumnsAhead >=1){
                        targetSquareId = squareId + 8 + 1;
                        targetSquare = this.boardSetting[targetSquareId];
                        this.verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet);
                    }                                                                                           
                    break;
                }
            }
        });
        this.legalMoves = moveSet;
    }
    
    verifyMove(targetSquare, targetSquareId, pieceId, pieceColor, moveSet){
        if(targetSquare.Piece == null){
            moveSet[pieceId].push(targetSquareId);
        }
        else{
            let targetPieceColor = targetSquare.Piece.Color;
            if(pieceColor != targetPieceColor){
                moveSet[pieceId].push(targetSquareId);
                if(targetSquare.Piece.Name == 'king'){
                    if(pieceColor == 'white'){
                        this.blackKingCheck = true;
                    }
                    else{
                        this.whiteKingCheck = true;
                    }
                } 
            }
        }
    } 

    verifyMoves(targetSquare, targetSquareId, pieceId, pieceColor, moveSet){
        if(targetSquare.Piece == null){
            moveSet[pieceId].push(targetSquareId);
        }
        else{
            let targetPieceColor = targetSquare.Piece.Color;
            if(pieceColor != targetPieceColor){
                moveSet[pieceId].push(targetSquareId);
                if(targetSquare.Piece.Name == 'king'){
                    console.log('THE KING IS CHECKED');
                    if(pieceColor == 'white'){
                        this.blackKingCheck = true;
                    }
                    else{
                        this.whiteKingCheck = true;
                    }
                } 
                return false;
            }
            else{
                return false;
            }
        }
        return true;
    }    


    movePiece(currentSquareId, targetSquareId){
        let currentSquare = this.boardSetting[currentSquareId];
        let currentPiece = currentSquare.Piece;
        let targetSquare = this.boardSetting[targetSquareId];
        targetSquare.Piece = currentPiece;
        currentSquare.Piece = null;
        if(currentPiece.Name == 'pawn'){
            if(this.checkForPawnPromotion(currentPiece.Color, targetSquareId)){
                showPawnPromotionDisplay(currentPiece.Color, targetSquareId, currentPiece.Id);
            }
            else{
                this.scanBoard();
                this.changePlayer();
            }
        }
        else{
            this.scanBoard();
            this.changePlayer();
        }
        this.blackKingCheck = false;
        this.whiteKingCheck = false;
        console.log('Main Board');
        console.log(gameBoard.BoardSetting);
        console.log('Virtual Board');
        console.log(virtualBoard.boardSetting);

    }

    checkForPawnPromotion(pieceColor,targetSquareId){
        const blackPromotion = [56, 57, 58, 59, 60, 61, 62, 63];
        const whitePromotion = [0, 1, 2, 3, 4, 5, 6, 7];
        if(pieceColor == 'black' && blackPromotion.includes(targetSquareId)){
            return true;
        }
        if(pieceColor == 'white' && whitePromotion.includes(targetSquareId)){
            return true;
        }
        return false;
    }
    promotePawn(squareId, target, name){
        this.BoardSetting[squareId].Piece.Icon = target;
        this.boardSetting[squareId].Piece.Name = name;
        this.scanBoard();
        this.changePlayer();
    }
    checkIFValidMovement(currentSquareId, targetSquareId){
        let currentPiece = this.boardSetting[currentSquareId].Piece;
        let currentPieceId = currentPiece.Id;
        let currentPieceColor = currentPiece.Color;
        if(this.legalMoves[currentPieceId].includes(targetSquareId)){
            if(this.boardSetting[targetSquareId].Piece == null){
                return true;
            }
            if(this.boardSetting[targetSquareId].Piece.Color != currentPieceColor){
                return true;
            }
        }
        return false;
    }
    changePlayer(){
        if(this.currentPlayer == 'white'){
            this.currentPlayer = 'black';
            updateDisplayInformation('Current Player: Black');
        }
        else{
            this.currentPlayer = 'white';
            updateDisplayInformation('Current Player: White');
        }
    }
}

//Board Display
function createDisplayBoard(boardSetting){
    let boardDisplay = document.querySelector('.board-container');
    boardSetting.forEach((square, i) => {
        let squareDisplay = document.createElement('div');
        squareDisplay.classList.add('square');
        squareDisplay.addEventListener('dragstart', dragStart);
        squareDisplay.addEventListener('dragover', dragOver);
        squareDisplay.addEventListener('drop', dragDrop);
        squareDisplay.addEventListener('click', highlightMovements);
        squareDisplay.addEventListener('click', clickSquare);
        if(square.Piece){
            squareDisplay.innerHTML = square.Piece.Icon;
        }
        else{
            squareDisplay.innerHTML = '';
        }
        if(squareDisplay.firstChild){
            squareDisplay.firstChild.addEventListener('click', highlightMovements);
            squareDisplay.firstChild.addEventListener('click', clickSquare);
        }
        squareDisplay.firstChild && squareDisplay.firstChild.setAttribute('draggable', true)
        squareDisplay.firstChild && squareDisplay.firstChild.setAttribute('draggable', true)
        squareDisplay.setAttribute('square-id', i);
        //console.log(squareDisplay);
        const row = Math.floor( (63 - i) / 8) + 1;
        if (row % 2 === 0) {
            squareDisplay.classList.add(i % 2 === 0 ? 'white' : 'black')
        } else {
            squareDisplay.classList.add(i % 2 === 0 ? 'black' : 'white')
        }   
        boardDisplay.appendChild(squareDisplay);     
    });
}

function changePieceColor(){
    let allSquares = document.querySelectorAll('.square');
    const blackSide = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const whiteSide = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];
    allSquares.forEach(square => {
        if(blackSide.includes(Number(square.getAttribute('square-id')))){
            square.firstChild.firstChild.classList.add('black-piece');
        }
        if(whiteSide.includes(Number(square.getAttribute('square-id')))){
            square.firstChild.firstChild.classList.add('white-piece');
        }
    });
}
function removeHighlights(){
    let allHighlights = document.querySelectorAll('.highlight');
    allHighlights.forEach(square => {
        square.classList.remove('highlight');
    });

}
function highlightMovements(e){
    e.stopPropagation();
    removeHighlights();
    let pieceId = gameBoard.boardSetting[Number(e.target.parentNode.getAttribute('square-id'))].Piece.Id;
    let legalMoves = gameBoard.legalMoves[pieceId];
    legalMoves.forEach(nextSquareId => {
        let highlightedSquare = document.querySelector(`[square-id="${nextSquareId}"]`)
        highlightedSquare.classList.add('highlight');
    });
}
function showPawnPromotionDisplay(color, squareId, pieceId){
    let promotionBoxContainer = document.querySelector('.promotion-box-container');
    let promotionBox = document.querySelector('.promotion-box');
    promotionBoxContainer.classList.add('open');
    promotionBoxContainer.style.fill = color;
    for(const child of promotionBox.children){
        child.setAttribute('square-id', squareId);
        child.setAttribute('piece-id', pieceId);
    }
    console.log(promotionBox);
}
function closePawnPromotionDisplay(id){

    let element = document.querySelector(`[id="${id}"]`);
    let target = element;
    let targetSquareId = target.getAttribute('square-id');
    let pieceId = target.getAttribute('piece-id');
    let pieceName = target.getAttribute('id');
    let targetSquare = document.querySelector(`[square-id="${targetSquareId}"]`);
    target.removeAttribute('square-id');
    target.removeAttribute('piece-id');
    target.removeAttribute('id');
    target.removeAttribute('onclick');
    targetSquare.firstChild.remove();
    targetSquare.appendChild(target);
    gameBoard.promotePawn(Number(targetSquareId), target, pieceName);
}
function updateDisplayInformation(text){
    let textBox = document.querySelector('.text-box');
    textBox.innerHTML = `<h3>${text}</h3>`

}

//Drag functions
let currentSquareId;
let draggedElement;

function dragStart(e){
    highlightMovements(e);
    currentSquareId = Number(e.target.parentNode.getAttribute('square-id'));
    draggedElement = e.target;
}

function dragOver(e){
    e.preventDefault();
}
function dragDrop(e){
    removeHighlights();
    let targetSquareId;
    console.log(e.target);

    if(e.target.firstChild){
        targetSquareId = Number(e.target.parentNode.getAttribute('square-id'));
    }
    else{
        targetSquareId = Number(e.target.getAttribute('square-id'));
    }
    if(gameBoard.boardSetting[currentSquareId].Piece.Color == gameBoard.currentPlayer){
        if(gameBoard.checkIFValidMovement(currentSquareId, targetSquareId)){
            console.log('Trying virtual move');
            virtualBoard.movePiece(currentSquareId, targetSquareId);
            virtualBoard.scanBoard();
            if(gameBoard.currentPlayer == 'white'){
                if(virtualBoard.WhiteKingCheck != true){
                    if(e.target.firstChild){
                        gameBoard.movePiece(currentSquareId, targetSquareId);
                        e.target.parentNode.appendChild(draggedElement);
                        e.target.remove();
                        virtualBoard = cloneBoard(gameBoard);
                    }
                    else{
                        gameBoard.movePiece(currentSquareId, targetSquareId);
                        e.target.appendChild(draggedElement);
                        virtualBoard = cloneBoard(gameBoard);
                    }
                }
                else{
                    virtualBoard = cloneBoard(gameBoard);
                    updateDisplayInformation('King Checked');
                }
            }
            else{
                if(virtualBoard.BlackKingCheck != true){
                    if(e.target.firstChild){
                        gameBoard.movePiece(currentSquareId, targetSquareId);
                        e.target.parentNode.appendChild(draggedElement);
                        e.target.remove();
                        virtualBoard = cloneBoard(gameBoard);
                    }
                    else{
                        gameBoard.movePiece(currentSquareId, targetSquareId);
                        e.target.appendChild(draggedElement);
                        virtualBoard = cloneBoard(gameBoard);
                    }
                }
                else{
                    virtualBoard = cloneBoard(gameBoard);
                    updateDisplayInformation('King Checked');
                }                
            }
        }
    }

}

//Click functions
let clickedId = -1;
let clickedElement;
function clickSquare(e){
    removeHighlights();
    highlightMovements(e);
    if(clickedId != -1){
        let targetSquareId;
        if(e.target.firstChild){
            targetSquareId = Number(e.target.parentNode.getAttribute('square-id'));
        }
        else{
            targetSquareId = Number(e.target.getAttribute('square-id'));
        }
        if(gameBoard.boardSetting[clickedId].Piece.Color == gameBoard.currentPlayer){
            if(gameBoard.checkIFValidMovement(clickedId, targetSquareId)){
                console.log('Trying virtual move');
                virtualBoard.movePiece(clickedId, targetSquareId);
                virtualBoard.scanBoard();
                if(gameBoard.currentPlayer == 'white'){
                    if(virtualBoard.WhiteKingCheck != true){
                        if(e.target.firstChild){
                            gameBoard.movePiece(clickedId, targetSquareId);
                            e.target.parentNode.appendChild(clickedElement);
                            e.target.remove();
                            clickedId = -1;
                            removeHighlights();
                            virtualBoard = cloneBoard(gameBoard);
                        }
                        else{
                            gameBoard.movePiece(clickedId, targetSquareId);
                            e.target.appendChild(clickedElement);
                            clickedId = -1;
                            virtualBoard = cloneBoard(gameBoard);
                        }
                    }
                    else{
                        virtualBoard = cloneBoard(gameBoard);
                        updateDisplayInformation('King Checked');
                    }
                }
                else{
                    if(virtualBoard.BlackKingCheck != true){
                        if(e.target.firstChild){
                            gameBoard.movePiece(clickedId, targetSquareId);
                            e.target.parentNode.appendChild(clickedElement);
                            e.target.remove();
                            clickedId = -1;
                            removeHighlights();
                            virtualBoard = cloneBoard(gameBoard);
                        }
                        else{
                            gameBoard.movePiece(clickedId, targetSquareId);
                            e.target.appendChild(clickedElement);
                            clickedId = -1;
                            virtualBoard = cloneBoard(gameBoard);
                        }
                    }
                    else{
                        virtualBoard = cloneBoard(gameBoard);
                        updateDisplayInformation('King Checked');
                    }
                }
            }
        }        
    }
    if(e.target.firstChild){
        clickedId = Number(e.target.parentNode.getAttribute('square-id'));
        clickedElement = e.target;
        console.log(clickedId);
    }
    else{
        clickedId = -1;
        console.log(clickedId);
    }
}

//Miscelaneous Functions

function cloneBoard(boardCloned){
    let clone = new board();
    boardCloned.BoardSetting.forEach(realsquare => {
        let id = realsquare.Id;
        let piece = realsquare.Piece;
        let virtualSquare = new square(id);
        virtualSquare.Piece = piece;
        clone.pushSquare(virtualSquare);

    });
    clone.BlackKingCheck = boardCloned.BlackKingCheck;
    clone.WhiteKingCheck = boardCloned.WhiteKingCheck;
    clone.LegalMoves = boardCloned.LegalMoves;
    clone.CurrentPlayer = boardCloned.CurrentPlayer;
    return clone;
}



let gameBoard = new board();
gameBoard.initialBoardSetting();

createDisplayBoard(gameBoard.boardSetting);
changePieceColor();
gameBoard.scanBoard();
let virtualBoard = cloneBoard(gameBoard);
console.log('Virtual Board');
console.log(virtualBoard);
console.log('GameBoard');
console.log(gameBoard);




