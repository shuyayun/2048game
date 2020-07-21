var board = new Array();
var scores = 0;
var hasConflicted = new Array();

$(function(){
	newgame();
});

function newgame(){
	// 页面初始化
	init();
	// 给页面加两个初始值
    generateOneNumber();
    generateOneNumber();
};

function init(){
	// 初始化表格位置
	for(var i=0; i<4; i++){
		for(var j=0;j<4; j++){
            var gridcell = $("#grid-cell-"+i+"-"+j);
            gridcell.css("top",cellLosTop(i,j));
            gridcell.css("left",cellLosLeft(i,j));
		}
	}
   // 初始化表格内数字
   //  1、把一维数组变成二维数组
    for(var i = 0; i < 4; i++){
       board[i] = new Array();
       hasConflicted[i] = new Array();
      for (var j = 0; j < 4; j++){
      	 board[i][j] = 0;
      	 hasConflicted[i][j]=false;
      }
   } 
   updateBoardView();
   scores = 0;

  }

   // 2、给每个表格内加入数值，背景，颜色，确定位置。
   function updateBoardView(){
   	 $(".num-cell").remove();//在每次初始化的时候都要清除之前的数字
   	  for(var i = 0; i < 4; i++)
   	  	for (var j = 0; j < 4; j++){
	        $("#grid-container").append('<div class="num-cell" id=\"num-cell-'+i+'-'+j+'\"></div>');
	         
	        var numcell = $('#num-cell-'+i+'-'+j);
            
	        if(board[i][j] == 0){
	            numcell.css("width","0px");
	            numcell.css("height","0px");
                numcell.css("top",cellLosTop(i,j)+50);
                numcell.css("left",cellLosLeft(i,j)+50);
	        }else {
                numcell.css("width","100px");
	            numcell.css("height","100px");
	            numcell.css("top",cellLosTop(i,j));
                numcell.css("left",cellLosLeft(i,j));
                numcell.css("background-color",getNumberBackgroundColor(board[i][j]));
                numcell.css("color",getNumberColor(board[i][j]));
                numcell.text(board[i][j]);
	    }
	    hasConflicted[i][j]=false;
   	  }
    
}

function generateOneNumber(){
     if(nospace(board))
        return false;		
        	// 确定初始值的位置   
		var randx = parseInt(Math.floor(Math.random()*4));
	    var randy = parseInt(Math.floor(Math.random()*4));
	    var times=0;
	    while (times<50) {
             if(board[randx][randy]==0)
             	break;
                randx = parseInt(Math.floor(Math.random()*4));
	            randy = parseInt(Math.floor(Math.random()*4));
	            times++;
	    }
	    if(times==50){
	    	for(var i=0; i<4;i++)
	    		for(var j=0;j<4;j++){
                    if(board[i][j]==0){
                    	randx = i;
                    	randy = j;
                    }
	    		}	
	    }
	// 确定初始值的值
	      var randnum=Math.random()<0.5?2:4;
	// 让初始值在页面显示出来
	      board[randx][randy]=randnum;
	      showNumWithAnimation(randx,randy,randnum);
	  return true;  
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://向左移动
		    if(moveLeft()){
			    setTimeout("generateOneNumber()",210);
			    setTimeout("isGameOver()",300);
		    };
		    break;
		case 38://向上移动
		    if(moveUp()){
			    setTimeout("generateOneNumber()",210);
			    setTimeout("isGameOver()",300);
		    };
		    break;
		case 39://向右移动
		    if(moveRight()){
			    setTimeout("generateOneNumber()",210);
			    setTimeout("isGameOver()",300);
		    };
		    break;
		case 40://向下移动
		    if(moveDown()){
			    setTimeout("generateOneNumber()",210);
			    setTimeout("isGameOver()",300);
		    };
		    break;
		default:
		    break;
	}
});

function isGameOver(){
    if(nospace(board)&&noMove(board)){
    	gameover();
    }
}

function gameover(){
    alert("游戏结束了");
}

function moveLeft(){
	if(!canMoveLeft(board))
        return false;

		// moveleft
		for(var i = 0; i < 4; i++)
			for(var j = 1; j < 4; j++){
				if( board[i][j]!= 0 ){
					for(var k = 0 ; k < j; k++){
                        if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        	// move
                        	showMoveAnimation(i,j,i,k);
                        	board[i][k] = board[i][j];
                        	board[i][j] = 0;
                        	continue;
                        }else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                            // move
                            // add
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j];
                        	board[i][j] = 0;
                        	// add scores
                        	scores += board[i][k];
                        	updateScores(scores);
                        	hasConflicted[i][k]=true;
                            continue;
                        }
				    }
			
				}
			}
        setTimeout("updateBoardView()",200);
		return true;
	}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	
		for(var j = 0; j < 4; j++)
		   for(var i = 1; i <  4; i++)
		   	   if(board[i][j] != 0){
		   	   	    for(var k=0; k<i; k++){
		   	   	        if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
		   	   	        	//move
		   	   	        	showMoveAnimation(i,j,k,j);
		   	   	        	board[k][j]=board[i][j];
		   	   	        	board[i][j]=0;
		   	   	        	continue;
		   	   	        }else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
		   	   	        	//move
		   	   	        	showMoveAnimation(i,j,k,j);
		   	   	        	board[k][j] *=2;
		   	   	        	board[i][j]=0;
		   	   	        	// add scores
                        	scores += board[k][j];
                        	updateScores(scores);
                        	hasConflicted[k][j]=true;
		   	   	        	continue;
		   	   	        }
		   	   	    }
		   	   
      }
		setTimeout("updateBoardView()",200);
		return true;
	}


function moveRight(){
	if(!canMoveRight(board))
			return false;
		for(var i=0; i<4;i++)
     	    for(var j=2; j>=0;j--){
                if(board[i][j]!=0){
                	for(var k=3; k>j; k--){
                        if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                            showMoveAnimation(i,j,i,k);
		   	   	        	board[i][k]=board[i][j];
		   	   	        	board[i][j]=0;
		   	   	        	continue;
                        }else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        	showMoveAnimation(i,j,i,k);
		   	   	        	board[i][k] *=2;
		   	   	        	board[i][j]=0;
		   	   	        	// add scores
                        	scores += board[i][k];
                        	updateScores(scores);
                        	hasConflicted[i][k]=true;
		   	   	        	continue;
                        }		
                	}
                }
            }

		   setTimeout("updateBoardView()",200);
           return true;
	}

function moveDown(){
	if(!canMoveDown(board))
        return false;
	for(var j=0; j<4;j++)
		for(var i=2; i>=0; i--)
			if(board[i][j]!=0){
				for(var k=3; k>i; k--){
					if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
						//move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j]+ board[k][j];
                        board[i][j] = 0;
                        // add scores
                        scores += board[k][j];
                        updateScores(scores);
                        hasConflicted[k][j]=true;
                        continue;
					}
				}
			}
	    setTimeout("updateBoardView()",200);
        return true;
}


