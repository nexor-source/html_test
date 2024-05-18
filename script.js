// script.js
function calculateInverse() {
    // 获取矩阵元素的值
    var a11 = parseFloat(document.getElementById('a11').value);
    var a12 = parseFloat(document.getElementById('a12').value);
    var a13 = parseFloat(document.getElementById('a13').value);
    var a21 = parseFloat(document.getElementById('a21').value);
    var a22 = parseFloat(document.getElementById('a22').value);
    var a23 = parseFloat(document.getElementById('a23').value);
    var a31 = parseFloat(document.getElementById('a31').value);
    var a32 = parseFloat(document.getElementById('a32').value);
    var a33 = parseFloat(document.getElementById('a33').value);
    
    // 计算矩阵的行列式
    var determinant = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31);

    // 计算逆矩阵
    var inverseMatrix = [
        [(a22 * a33 - a23 * a32) / determinant, (a13 * a32 - a12 * a33) / determinant, (a12 * a23 - a13 * a22) / determinant],
        [(a23 * a31 - a21 * a33) / determinant, (a11 * a33 - a13 * a31) / determinant, (a13 * a21 - a11 * a23) / determinant],
        [(a21 * a32 - a22 * a31) / determinant, (a12 * a31 - a11 * a32) / determinant, (a11 * a22 - a12 * a21) / determinant]
    ];

    // 构建结果表格
    var resultTable = "<table class='result-table'>";
    for (var i = 0; i < inverseMatrix.length; i++) {
        resultTable += "<tr>";
        for (var j = 0; j < inverseMatrix[i].length; j++) {
            resultTable += "<td>" + inverseMatrix[i][j].toFixed(2) + "</td>"; // 保留两位小数
        }
        resultTable += "</tr>";
    }
    resultTable += "</table>";

    // 显示结果表格
    document.getElementById('result').innerHTML = "Inverse Matrix: <br>" + resultTable;
}
