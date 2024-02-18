



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
        this.blackKingCheck = false;
        this.whiteKingCheck = false;
        this.boardSetting = [];
        this.legalMoves;
        this.currentPlayer = 'white';
        this.whiteAttackedSquares = new Array(64);
        this.blackAttackedSquares = new Array(64);
        this.currentPiecePositions = new Object();
        this.virtualBoard;
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
    
    set CurrentPlayer(currentPlayer){
        this.currentPlayer = currentPlayer;
    }

    get WhiteKingCheck(){
        return this.whiteKingCheck;
    }

    set WhiteKingCheck(whiteKingCheck){
        this.whiteKingCheck = whiteKingCheck;
    }

    get BlackKingCheck(){
        return this.blackKingCheck;
    }

    set BlackKingCheck(blackKingCheck){
        this.blackKingCheck = blackKingCheck;
    }

    get WhiteAttackedSquares(){
        return this.whiteAttackedSquares;
    }
    
    get BlackAttackedSquares(){
        return this.blackAttackedSquares;
    }

    get CurrentPiecePositions(){
        return this.currentPiecePositions;
    }

    emptyMoves(){

        this.legalMoves = [];
    }

    pushSquare(square){
        this.boardSetting.push(square);
    }

    initialBoardSetting(){
        for(let i = 0; i < 16; i++){
            let newSquare = new square(i);
            let newPiece = new piece();
            newPiece.Name = blackSide[i].Name
            newPiece.Icon = blackSide[i].Icon;
            let id = i;
            newPiece.Id = id;
            newPiece.Color = 'black';
            newSquare.piece = newPiece;
            this.boardSetting.push(newSquare);
            this.currentPiecePositions[id] = i;
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
            let id = i + 16
            newPiece.Id = id;
            newPiece.Color = 'white';
            newSquare.piece = newPiece;
            this.boardSetting.push(newSquare);
            this.currentPiecePositions[id] = i + 48;

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
    
                    if(initialPositionBlack.includes(squareId) && this.boardSetting[squareId].Piece != null && pieceColor == 'black'){
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
                    if(pieceColor == 'black' && remainingColumnsAhead > 0){                    
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

                    if(pieceColor == 'black' && remainingColumnsBehind > 0){
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

                    if(initialPositionWhite.includes(squareId) && this.boardSetting[squareId].Piece != null && pieceColor =='white'){
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

                    if(pieceColor == 'white' && remainingColumnsAhead > 0){
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
                    if(pieceColor == 'white' && remainingColumnsBehind > 0){
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
        let currentPieceId = currentPiece.Id;
        let targetSquare = this.boardSetting[targetSquareId];
        if(targetSquare.Piece != null){
            this.currentPiecePositions[targetSquare.Piece.Id] = null;
        }
        currentSquare.Piece = null;
        this.currentPiecePositions[currentPieceId] = targetSquareId;
        if(currentPiece.Name == 'pawn'){
            if(this.checkForPawnPromotion(currentPiece.Color, targetSquareId)){
                showPawnPromotionDisplay(currentPiece.Color,currentSquare.Id ,targetSquareId, currentPiece.Id);
            }
            else{
                targetSquare.Piece = currentPiece;
                this.scanBoard();
                this.changePlayer();
                this.updateAttackedSquares();
            }
        }
        else{
            targetSquare.Piece = currentPiece;
            this.scanBoard();
            this.changePlayer();
            this.updateAttackedSquares();
        }
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
    promotePawn(squareId, target, name, id, color){
        console.log(squareId, name, id, color);
        let newPiece = new piece();
        newPiece.Icon = target;
        newPiece.Name = name;
        newPiece.Id = Number(id);
        newPiece.Color = color;
        this.BoardSetting[squareId].Piece = null;
        this.BoardSetting[squareId].Piece = newPiece;
        this.scanBoard();
        this.changePlayer();
        this.updateAttackedSquares();   
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
    updateAttackedSquares(){
        this.blackAttackedSquares = new Array(64);
        for(let i = 0; i < 8; i++){
            let currentMoves = this.legalMoves[i];
            this.blackAttackedSquares[this.currentPiecePositions[i]] = 3;
            currentMoves.forEach(idSquare => {
                this.blackAttackedSquares[idSquare] = 1;
            });
        }
        for(let i = 8; i < 16; i++){
            let currentMove = this.legalMoves[i][0];
            this.blackAttackedSquares[this.currentPiecePositions[i]] = 3;
            this.blackAttackedSquares[currentMove + 1] = 1;
            this.blackAttackedSquares[currentMove - 1] = 1;
            if(currentMove % 8 == 0){
                this.blackAttackedSquares[currentMove - 1] = null;
            }
            if((currentMove + 1) % 8 == 0){
                this.blackAttackedSquares[currentMove + 1] = null;
            }
        }
        this.whiteAttackedSquares = new Array(64);
        for(let i = 16; i < 24; i++){
            let currentMove = this.legalMoves[i][0];
            this.whiteAttackedSquares[this.currentPiecePositions[i]] = 3;
            this.whiteAttackedSquares[currentMove + 1] = 1;
            this.whiteAttackedSquares[currentMove - 1] = 1;
            if(currentMove % 8 == 0){
                this.whiteAttackedSquares[currentMove - 1] = null;
            }
            if((currentMove + 1) % 8 == 0){
                this.whiteAttackedSquares[currentMove + 1] = null;
            }
        }
        for(let i = 24; i < 32; i++){
            let currentMoves = this.legalMoves[i];
            this.whiteAttackedSquares[this.currentPiecePositions[i]] = 3;
            currentMoves.forEach(idSquare => {
                this.whiteAttackedSquares[idSquare] = 1;
            });
        }
    }

    checkforCheck(currentSquareId, targetSquareId){
        this.virtualBoard.movePiece(currentSquareId, targetSquareId);
        if(this.virtualBoard.CurrentPlayer == 'black'){
            if(this.virtualBoard.WhiteKingCheck == true){
                this.cloneBoard()
                this.virtualBoard.WhiteKingCheck = false;
                return true;
            }
        }
        else{
            if(this.virtualBoard.BlackKingCheck == true){
                this.cloneBoard()
                this.virtualBoard.BlackKingCheck = false;
                return true;
            }
        }
        this.cloneBoard()
        return false;
    }
    
    checkOpponent(){
        if(this.currentPlayer == 'black'){
            return this.blackKingCheck;
        }
        else{
            return this.whiteKingCheck;
        }
    }

    checkForCheckMate(){
        let currentKingPosition = 0;
        let lineOfSight = [];
        let i = 1;
        let sameSidePiece = 0;
        let checked = true;
        if(this.currentPlayer == 'white'){
            currentKingPosition = this.currentPiecePositions[28];
            let availableMoves = this.legalMoves[28];
            if(this.blackAttackedSquares[currentKingPosition] != 1){
                alert('You are safe');
                checked = false;
            }
            console.log(this.availableMoves);
            availableMoves.forEach(move => {
                if(this.blackAttackedSquares[move] != 1){
                    alert('YOU CAN ESCAPE');
                    checked = false;
                }
            });         
            //Right
            if(this.blackAttackedSquares[currentKingPosition + i] == 1 || this.blackAttackedSquares[currentKingPosition + i] == 3){
                while(this.blackAttackedSquares[currentKingPosition + i] == 1){
                    if(this.boardSetting[currentKingPosition + i].Piece != null){
                        if(this.boardSetting[currentKingPosition + i].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition + i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition + i);
                }
                else{
                    sameSidePiece = 0;
                }
                i = 1;
            }
            //Left
            if(this.blackAttackedSquares[currentKingPosition - i] == 1 || this.blackAttackedSquares[currentKingPosition - i] == 3){
                while(this.blackAttackedSquares[currentKingPosition - i] == 1){
                    if(this.boardSetting[currentKingPosition - i].Piece != null){
                        if(this.boardSetting[currentKingPosition - i].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition - i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - i);
                        i++;
                    }                    
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - i);
                }
                else{
                    sameSidePiece = 0;
                }   
                i = 1;                          
            }
            //Up
            if(this.blackAttackedSquares[currentKingPosition - (i * 8)] == 1 || this.blackAttackedSquares[currentKingPosition - (i * 8)] == 3){
                while(this.blackAttackedSquares[currentKingPosition - (i * 8)] == 1){
                    if(this.boardSetting[currentKingPosition - (i * 8)].Piece != null){
                        if(this.boardSetting[currentKingPosition - (i * 8)].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition - (i * 8));
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - (i * 8));
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8));
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1;                
            }
            //Down
            if(this.blackAttackedSquares[currentKingPosition + (i * 8) ] == 1 || this.blackAttackedSquares[currentKingPosition + (i * 8) ] == 3){
                while(this.blackAttackedSquares[currentKingPosition + (i * 8) ] == 1){
                    if(this.boardSetting[currentKingPosition + (i * 8)].Piece != null){
                        if(this.boardSetting[currentKingPosition + (i * 8)].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition + (i * 8));
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + (i * 8));
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8));
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1;                
            }
            //UpRight
            if(this.blackAttackedSquares[currentKingPosition - (i * 8) + i ] == 1 || this.blackAttackedSquares[currentKingPosition - (i * 8) + i ] == 3){
                while(this.blackAttackedSquares[currentKingPosition - (i * 8) + i ] == 1){
                    if(this.boardSetting[currentKingPosition - (i * 8) + i ].Piece != null){
                        if(this.boardSetting[currentKingPosition - (i * 8) + i ].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition - (i * 8) + i );
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - (i * 8) + i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8) + i);
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1;  
            }          
            //UpLeft
            if(this.blackAttackedSquares[currentKingPosition - (i * 8) - i] == 1 || this.blackAttackedSquares[currentKingPosition - (i * 8) - i] == 3){
                while(this.blackAttackedSquares[currentKingPosition - (i * 8) - i] == 1){
                    if(this.boardSetting[currentKingPosition - (i * 8) - i].Piece != null){
                        if(this.boardSetting[currentKingPosition - (i * 8) - i].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition - (i * 8) - i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - (i * 8) - i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8) - i);
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1; 
            }               
            //DownRight    
            if(this.blackAttackedSquares[currentKingPosition + (i * 8) + i] == 1 || this.blackAttackedSquares[currentKingPosition + (i * 8) + i] == 3){
                while(this.blackAttackedSquares[currentKingPosition + (i * 8) + i] == 1){
                    if(this.boardSetting[currentKingPosition + (i * 8) + i].Piece != null){
                        if(this.boardSetting[currentKingPosition + (i * 8) + i].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition + (i * 8) + i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + (i * 8) + i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition + (i * 8) + i);
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1; 
            }          
            //DownLeft
            if(this.blackAttackedSquares[currentKingPosition + (i * 8) - i] == 1 || this.blackAttackedSquares[currentKingPosition + (i * 8) - i] == 3){
                while(this.blackAttackedSquares[currentKingPosition + (i * 8) - i] == 1){
                    if(this.boardSetting[currentKingPosition + (i * 8) - i].Piece != null){
                        if(this.boardSetting[currentKingPosition + (i * 8) - i].Piece.Color == 'black'){
                            lineOfSight.push(currentKingPosition + (i * 8) - i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + (i * 8) - i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition + (i * 8) - i);
                }
            }
            console.log('Sight');             
            console.log(lineOfSight);
            console.log('Attacked squares');
            console.log(this.blackAttackedSquares); 
            for(let i = 0; i < 16; i++){
                let id = i + 16;
                let currentPiecePosition = this.CurrentPiecePositions[id];
                this.legalMoves[id].forEach(move => {
                    if(!this.checkforCheck(currentPiecePosition, move)){
                        checked = false;
                    }
                });
            }           
        }
        else{
            currentKingPosition = this.currentPiecePositions[4];
            let availableMoves = this.legalMoves[4];
            if(this.whiteAttackedSquares[currentKingPosition] != 1){
                alert('You are safe');
                checked = false;
            }            
            availableMoves.forEach(move => {
                if(this.whiteAttackedSquares[move] != 1){
                    alert('YOU CAN ESCAPE');
                    checked = false;
                }
            });    
            //Right
            if(this.whiteAttackedSquares[currentKingPosition + i] == 1 || this.whiteAttackedSquares[currentKingPosition + i] == 3){
                while(this.whiteAttackedSquares[currentKingPosition + i] == 1){
                    if(this.boardSetting[currentKingPosition + i].Piece != null){
                        if(this.boardSetting[currentKingPosition + i].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition + i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition + i);
                }
                else{
                    sameSidePiece = 0;
                }
                i = 1;
            }
            //Left
            if(this.whiteAttackedSquares[currentKingPosition - i] == 1 || this.whiteAttackedSquares[currentKingPosition - i] == 3){
                while(this.whiteAttackedSquares[currentKingPosition - i] == 1){
                    if(this.boardSetting[currentKingPosition - i].Piece != null){
                        if(this.boardSetting[currentKingPosition - i].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition - i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - i);
                        i++;
                    }                    
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - i);
                }
                else{
                    sameSidePiece = 0;
                }   
                i = 1;                          
            }
            //Up
            if(this.whiteAttackedSquares[currentKingPosition - (i * 8)] == 1 || this.whiteAttackedSquares[currentKingPosition - (i * 8)] == 3){
                while(this.whiteAttackedSquares[currentKingPosition - (i * 8)] == 1){
                    if(this.boardSetting[currentKingPosition - (i * 8)].Piece != null){
                        if(this.boardSetting[currentKingPosition - (i * 8)].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition - (i * 8));
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - (i * 8));
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8));
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1;                
            }
            //Down
            if(this.whiteAttackedSquares[currentKingPosition + (i * 8) ] == 1 || this.whiteAttackedSquares[currentKingPosition + (i * 8) ] == 3){
                while(this.whiteAttackedSquares[currentKingPosition + (i * 8) ] == 1){
                    if(this.boardSetting[currentKingPosition + (i * 8)].Piece != null){
                        if(this.boardSetting[currentKingPosition + (i * 8)].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition + (i * 8));
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + (i * 8));
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8));
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1;                
            }
            //UpRight
            if(this.whiteAttackedSquares[currentKingPosition - (i * 8) + i ] == 1 || this.whiteAttackedSquares[currentKingPosition - (i * 8) + i ] == 3){
                while(this.whiteAttackedSquares[currentKingPosition - (i * 8) + i ] == 1){
                    if(this.boardSetting[currentKingPosition - (i * 8) + i ].Piece != null){
                        if(this.boardSetting[currentKingPosition - (i * 8) + i ].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition - (i * 8) + i );
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - (i * 8) + i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8) + i);
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1;  
            }          
            //UpLeft
            if(this.whiteAttackedSquares[currentKingPosition - (i * 8) - i] == 1 || this.whiteAttackedSquares[currentKingPosition - (i * 8) - i] == 3){
                while(this.whiteAttackedSquares[currentKingPosition - (i * 8) - i] == 1){
                    if(this.boardSetting[currentKingPosition - (i * 8) - i].Piece != null){
                        if(this.boardSetting[currentKingPosition - (i * 8) - i].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition - (i * 8) - i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition - (i * 8) - i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition - (i * 8) - i);
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1; 
            }               
            //DownRight    
            if(this.whiteAttackedSquares[currentKingPosition + (i * 8) + i] == 1 || this.whiteAttackedSquares[currentKingPosition + (i * 8) + i] == 3){
                while(this.whiteAttackedSquares[currentKingPosition + (i * 8) + i] == 1){
                    if(this.boardSetting[currentKingPosition + (i * 8) + i].Piece != null){
                        if(this.boardSetting[currentKingPosition + (i * 8) + i].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition + (i * 8) + i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + (i * 8) + i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition + (i * 8) + i);
                }
                else{
                    sameSidePiece = 0;
                }  
                i = 1; 
            }          
            //DownLeft
            if(this.whiteAttackedSquares[currentKingPosition + (i * 8) - i] == 1 || this.whiteAttackedSquares[currentKingPosition + (i * 8) - i] == 3){
                while(this.whiteAttackedSquares[currentKingPosition + (i * 8) - i] == 1){
                    if(this.boardSetting[currentKingPosition + (i * 8) - i].Piece != null){
                        if(this.boardSetting[currentKingPosition + (i * 8) - i].Piece.Color == 'white'){
                            lineOfSight.push(currentKingPosition + (i * 8) - i);
                            i++;
                        }
                        else{
                            sameSidePiece = 1;
                            break;
                        }
                    }
                    else{
                        lineOfSight.push(currentKingPosition + (i * 8) - i);
                        i++;
                    }
                }
                if(sameSidePiece == 0){
                    lineOfSight.push(currentKingPosition + (i * 8) - i);
                }
            }                    
        }
        return checked;

    }
    cloneBoard(){
        this.virtualBoard = new board();
        this.boardSetting.forEach(realsquare => {
            let id = realsquare.Id;
            let piece = realsquare.Piece;
            let virtualSquare = new square(id);
            virtualSquare.Piece = piece;
            this.virtualBoard.pushSquare(virtualSquare);
    
        });
        this.virtualBoard.BlackKingCheck = this.blackKingCheck;
        this.virtualBoard.WhiteKingCheck = this.whiteKingCheck;
        this.virtualBoard.LegalMoves = this.legalMoves;
        this.virtualBoard.CurrentPlayer = this.currentPlayer;
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
function showPawnPromotionDisplay(color, currentSquareId, targetSquareId, pieceId){
    let promotionBoxContainer = document.querySelector('.promotion-box-container');
    let promotionBox = document.querySelector('.promotion-box');
    promotionBoxContainer.classList.add('open');
    promotionBoxContainer.style.fill = color;
    for(const child of promotionBox.children){
        child.setAttribute('square-id', targetSquareId);
        child.setAttribute('piece-id', pieceId);
        child.setAttribute('color', color);
        child.setAttribute('current-square-id', currentSquareId);
    }
    console.log(promotionBox);
}
function closePawnPromotionDisplay(id){
    let promotionBoxContainer = document.querySelector('.promotion-box-container');
    promotionBoxContainer.classList.remove('open');
    let element = document.querySelector(`[id="${id}"]`);
    let target = element.cloneNode(true);
    let targetSquareId = target.getAttribute('square-id');
    let pieceId = target.getAttribute('piece-id');
    let pieceName = target.getAttribute('id');
    let pieceColor = target.getAttribute('color');
    let targetSquare = document.querySelector(`[square-id="${targetSquareId}"]`);
    target.removeAttribute('square-id');
    target.removeAttribute('piece-id');
    target.removeAttribute('id');
    target.removeAttribute('onclick');
    if(pieceColor == 'white'){
        target.classList.add('white-piece');
    }
    else{
        target.classList.add('black-piece');
    }
    targetSquare.firstChild.remove();
    targetSquare.appendChild(target);

    gameBoard.promotePawn(Number(targetSquareId), target, pieceName, pieceId, pieceColor);
    virtualBoard.promotePawn(Number(targetSquareId), target, pieceName, pieceId, pieceColor);
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
            if(!gameBoard.checkforCheck(currentSquareId, targetSquareId)){
                if(e.target.firstChild){
                    gameBoard.movePiece(currentSquareId, targetSquareId);
                    e.target.parentNode.appendChild(draggedElement);
                    e.target.remove();
                    gameBoard.cloneBoard();
                    if(gameBoard.checkOpponent()){
                        if(gameBoard.checkForCheckMate()){
                            updateDisplayInformation('Game over');
                        }
                    }
                }
                else{
                    gameBoard.movePiece(currentSquareId, targetSquareId);
                    e.target.appendChild(draggedElement);
                    gameBoard.cloneBoard();
                    if(gameBoard.checkOpponent()){
                        if(gameBoard.checkForCheckMate()){
                            updateDisplayInformation('Game over');
                        }
                    }
                }
            }
            else{
                updateDisplayInformation('King Checked');
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


function callCheckmate(){
    gameBoard.checkForCheckMate();
}


let gameBoard = new board();
gameBoard.initialBoardSetting();

createDisplayBoard(gameBoard.boardSetting);
changePieceColor();
gameBoard.scanBoard();
gameBoard.updateAttackedSquares();
gameBoard.cloneBoard();
console.log('Positions');
console.log(gameBoard.CurrentPiecePositions);






