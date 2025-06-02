// HTMLドキュメントが完全に読み込まれてから実行
document.addEventListener('DOMContentLoaded', function() {

    // HTML要素を取得
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const num3Input = document.getElementById('num3');
    const calculateButton = document.getElementById('calculateButton');
    const resultSpan = document.getElementById('result');

    // 「合計を計算」ボタンがクリックされたときの処理
    calculateButton.addEventListener('click', function() {
        // 入力値を取得し、数値に変換 (浮動小数点数として扱う場合はparseFloat)
        const val1 = parseFloat(num1Input.value);
        const val2 = parseFloat(num2Input.value);
        const val3 = parseFloat(num3Input.value);

        // 入力が有効な数字かどうかをチェック
        if (isNaN(val1) || isNaN(val2) || isNaN(val3)) {
            resultSpan.textContent = '有効な数字を3つ入力してください。';
            resultSpan.style.color = 'red'; // エラーメッセージは赤字で
        } else {
            // 合計を計算
            const sum = val1 + val2 + val3;
            // 結果を表示
            resultSpan.textContent = sum;
            resultSpan.style.color = '#e74c3c'; // 通常の結果の色 (CSSで指定した色に戻すか、ここで指定)
        }
    });
});