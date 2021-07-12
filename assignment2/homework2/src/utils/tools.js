function getRotationPrecomputeL(precompute_L, rotationMatrix){
	let rotMat = mat4Matrix2mathMatrix(rotationMatrix);
	let colorMat3 = [];
	
	for(var i = 0; i<3; i++){
	precompute_L_3 = math.multiply( computeSquareMatrix_3by3(rotMat),math.matrix([precompute_L[1][i], precompute_L[2][i],
					precompute_L[3][i]]));
	precompute_L_5 = math.multiply(computeSquareMatrix_5by5(rotMat),math.matrix([precompute_L[4][i], precompute_L[5][i],
					precompute_L[6][i], precompute_L[7][i], precompute_L[8][i]]));
	colorMat3[i] = mat3.fromValues(precompute_L[0][i], precompute_L_3._data[0], precompute_L_3._data[1],
		precompute_L_3._data[2], precompute_L_5._data[0], precompute_L_5._data[1],
		precompute_L_5._data[2], precompute_L_5._data[3], precompute_L_5._data[4]);
	}
	return colorMat3;
}

function computeSquareMatrix_3by3(rotationMatrix){ // 计算方阵SA(-1) 3*3 
	
	// 1、pick ni - {ni}
	let n1 = [1, 0, 0, 0]; let n2 = [0, 0, 1, 0]; let n3 = [0, 1, 0, 0];

	// 2、{P(ni)} - A  A_inverse
	P_1 = SHEval(1,0,0,3);
	P_2 = SHEval(0,1,0,3);
	P_3 = SHEval(0,0,1,3);
	P = math.matrix([[P_1[1],P_1[2],P_1[3]],
					[P_2[1],P_2[2],P_2[3]],
					[P_3[1],P_3[2],P_3[3]]
					]);
	A_inv = math.inv(P);
	// 3、用 R 旋转 ni - {R(ni)}
	R_1 = math.multiply(rotationMatrix,n1)._data;
	R_2 = math.multiply(rotationMatrix,n2)._data;
	R_3 = math.multiply(rotationMatrix,n3)._data;

	// 4、R(ni) SH投影 - S
	S_1 = SHEval(R_1[0],R_1[1],R_1[2],3);
	S_2 = SHEval(R_2[0],R_2[1],R_2[2],3); 
	S_3 = SHEval(R_3[0],R_3[1],R_3[2],3);
	S = math.matrix([[S_1[1],S_1[2],S_1[3]],
					[S_2[1],S_2[2],S_2[3]],
					[S_3[1],S_3[2],S_3[3]]
					]);
	// 5、S*A_inverse
    return math.multiply(S,A_inv);
}

function computeSquareMatrix_5by5(rotationMatrix){ // 计算方阵SA(-1) 5*5
	
	// 1、pick ni - {ni}
	let k = 1 / math.sqrt(2);
	let n1 = [1, 0, 0, 0]; let n2 = [0, 0, 1, 0]; let n3 = [k, k, 0, 0]; 
	let n4 = [k, 0, k, 0]; let n5 = [0, k, k, 0];

	// 2、{P(ni)} - A  A_inverse
	P_1 = SHEval(1,0,0,3);
	P_2 = SHEval(0,1,0,3);
	P_3 = SHEval(k,k,0,3);
	P_4 = SHEval(k,0,k,3);
	P_5 = SHEval(0,k,k,3);
	P = math.matrix([[P_1[4],P_1[5],P_3[6],P_1[7],P_1[8]],
					[P_2[4],P_2[5],P_2[6],P_2[7],P_2[8]],
					[P_3[4],P_3[5],P_3[6],P_3[7],P_3[8]],
					[P_4[4],P_4[5],P_4[6],P_4[7],P_4[8]],
					[P_5[4],P_5[5],P_5[6],P_5[7],P_5[8]]
					]);
	A_inv = math.inv(P);
	// 3、用 R 旋转 ni - {R(ni)}
	R_1 = math.multiply(rotationMatrix,n1)._data;
	R_2 = math.multiply(rotationMatrix,n2)._data;
	R_3 = math.multiply(rotationMatrix,n3)._data;
	R_4 = math.multiply(rotationMatrix,n3)._data;
	R_5 = math.multiply(rotationMatrix,n3)._data;
	// 4、R(ni) SH投影 - S
	S_1 = SHEval(R_1[0],R_1[1],R_1[2],3);
	S_2 = SHEval(R_2[0],R_2[1],R_2[2],3);
	S_3 = SHEval(R_3[0],R_3[1],R_3[2],3);
	S_4 = SHEval(R_4[0],R_4[1],R_4[2],3);
	S_5 = SHEval(R_5[0],R_5[1],R_5[2],3);
	S = math.matrix([[S_1[4],S_1[5],S_3[6],S_1[7],S_1[8]],
					[S_2[4],S_2[5],S_2[6],S_2[7],S_2[8]],
					[S_3[4],S_3[5],S_3[6],S_3[7],S_3[8]],
					[S_4[4],S_4[5],S_4[6],S_4[7],S_4[8]],
					[S_5[4],S_5[5],S_5[6],S_5[7],S_5[8]]
					]);
	// 5、S*A_inverse
    return math.multiply(S,A_inv);
}

function mat4Matrix2mathMatrix(rotationMatrix){

	let mathMatrix = [];
	for(let i = 0; i < 4; i++){
		let r = [];
		for(let j = 0; j < 4; j++){
			r.push(rotationMatrix[i*4+j]);
		}
		mathMatrix.push(r);
	}
	//return mathMatrix;
	return math.matrix(mathMatrix)
}

function getMat3ValueFromRGB(precomputeL){

    let colorMat3 = [];
    for(var i = 0; i<3; i++){
        colorMat3[i] = mat3.fromValues( precomputeL[0][i], precomputeL[1][i], precomputeL[2][i],
										precomputeL[3][i], precomputeL[4][i], precomputeL[5][i],
										precomputeL[6][i], precomputeL[7][i], precomputeL[8][i] ); 
	}
    return colorMat3;
}