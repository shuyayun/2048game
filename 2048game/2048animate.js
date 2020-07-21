function showNumWithAnimation(i, j,randnum){
	var newnumcell=$("#num-cell-"+i+"-"+j);
	    newnumcell.css("background-color",getNumberBackgroundColor(randnum));
	    newnumcell.css("color",getNumberColor(randnum));
	    newnumcell.text(randnum);
	    newnumcell.animate({
            width:"100px",
            height:"100px",
            top:cellLosTop(i,j),
            left:cellLosLeft(i,j)
         },50)
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numcell= $('#num-cell-'+fromx+'-'+fromy);
	     numcell.animate({
         top:cellLosTop(tox,toy),
         left:cellLosLeft(tox,toy)
		},200);
}

function updateScores(scores){
	$("#score").text(scores);
}