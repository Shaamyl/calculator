let screen = document.querySelector(".screen");

let nums = document.querySelectorAll(".num");
let ops = document.querySelectorAll(".op");
//remember, always float!
let expression = []
let number = []
let isOp = false

nums.forEach(function(num){
	num.onclick = function(){
		if(screen.textContent.length < 21){
			screen.textContent += num.textContent
			number.push(+num.textContent)
			isOp = false
		}
	}
});

ops.forEach(function(op){
	op.onclick = () => {
		if(screen.textContent != "" && screen.textContent.length < 21){
			if(isOp === false){
				expression.push(+number.join(""))
				number = []
				screen.textContent += op.textContent
				expression.push(op.textContent)
				isOp = true
			}else{
					console.log(expression)
					screen.textContent = screen.textContent.slice(0,-1)
					expression.pop()
					screen.textContent += op.textContent
					expression.push(op.textContent)
					isOp = true
				
			}
		}
		
	}
});

document.querySelector('.dot').onclick = function(){
	let noPoint = true;
	number.forEach(function(num){
		if(num.toString().includes(".")){
			noPoint = false;
		}
	})
	if(screen.textContent.length < 21 && noPoint){
		screen.textContent += "."
		number.push(".")
		isOp = false
	}
}

document.querySelector('.equal').onclick = () => {
	if(isOp === false){
		expression.push(+number.join(""))
		evalExpression()
		screen.textContent = expression.pop();
	}else{
		screen.textContent = "Invalid";	
	}
	number = [+screen.textContent]
	console.log(number)
	expression = []
	isOp = false
	
}

document.querySelector('.ac').onclick = () =>{
	screen.textContent = "";
	isOp = false
	expression = []
	number = []
}

function evaluate(x, y, op){
	if(op==="+"){
		return x + y;
	}else if(op==="-"){
		return x - y;
	}else if(op==="*"){
		return x * y;
	}else if(op==="/"){
		return x / y;
	}
}

function evalExpression(){
	expression.forEach(function(term){
		if(term === "*"){
			let index = expression.indexOf(term)
			let num1 = expression.splice(index-1, 1)
			expression.splice(index - 1, 1)
			let num2 = expression.splice(index - 1, 1)
			let result = num1*num2
			expression.splice(index-1, 0, result)
		}
		
	})
	expression.forEach(function(term){
		if(term === "/"){
			let index = expression.indexOf(term)
			let num1 = expression.splice(index-1, 1)
			expression.splice(index - 1, 1)
			let num2 = expression.splice(index - 1, 1)
			let result = num1/num2
			expression.splice(index-1, 0, result)
		}
		
	})
	expression.forEach(function(term){
		if(term === "-"){
			let index = expression.indexOf(term)
			let num1 = expression.splice(index-1, 1)
			expression.splice(index - 1, 1)
			let num2 = expression.splice(index - 1, 1)
			let result = num1-num2
			expression.splice(index-1, 0, result)
		}
		
	})
	expression.forEach(function(term){
		if(term === "+"){
			let index = expression.indexOf(term)
			let num1 = expression.splice(index-1, 1)
			expression.splice(index - 1, 1)
			let num2 = expression.splice(index - 1, 1)
			let result = +num1 + +num2
			expression.splice(index-1, 0, result)
		}
		
	})
}
