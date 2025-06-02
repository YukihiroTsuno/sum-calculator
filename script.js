document.addEventListener('DOMContentLoaded', function() {
    // Firebase Authのインスタンス (HTMLでグローバルに定義されているものを使用)
    // const auth = firebase.auth(); // HTMLのscriptタグ内で初期化済み

    // HTML要素の取得
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');

    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupButton = document.getElementById('signup-button');

    const logoutButton = document.getElementById('logout-button');
    const userEmailSpan = document.getElementById('user-email');
    const authErrorP = document.getElementById('auth-error');

    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const num3Input = document.getElementById('num3');
    const calculateButton = document.getElementById('calculateButton');
    const resultSpan = document.getElementById('result');
    const calculationErrorP = document.getElementById('calculation-error');

    // --- 認証関連の処理 ---

    // 新規登録処理
    signupButton.addEventListener('click', () => {
        const email = signupEmailInput.value;
        const password = signupPasswordInput.value;
        authErrorP.textContent = ''; // エラーメッセージをクリア

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // 登録成功
                console.log('ユーザー登録成功:', userCredential.user);
                // 必要であれば、登録後に自動でログイン状態にするなど
                // ここでは特に何もしない (onAuthStateChangedでUI更新される)
                signupEmailInput.value = '';
                signupPasswordInput.value = '';
            })
            .catch((error) => {
                console.error('登録エラー:', error);
                authErrorP.textContent = getAuthErrorMessage(error);
            });
    });

    // ログイン処理
    loginButton.addEventListener('click', () => {
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        authErrorP.textContent = '';

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // ログイン成功
                console.log('ログイン成功:', userCredential.user);
                loginEmailInput.value = '';
                loginPasswordInput.value = '';
            })
            .catch((error) => {
                console.error('ログインエラー:', error);
                authErrorP.textContent = getAuthErrorMessage(error);
            });
    });

    // ログアウト処理
    logoutButton.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                console.log('ログアウト成功');
            })
            .catch((error) => {
                console.error('ログアウトエラー:', error);
                // UIはonAuthStateChangedで更新されるが、念のためエラー表示
                authErrorP.textContent = 'ログアウトに失敗しました。';
            });
    });

    // 認証状態の監視
    auth.onAuthStateChanged((user) => {
        if (user) {
            // ユーザーがログインしている場合
            console.log('ログイン状態:', user);
            authContainer.style.display = 'none';
            appContainer.style.display = 'block'; // または 'flex' など、元のCSSに合わせて
            userEmailSpan.textContent = user.email; // ユーザーのメールアドレスを表示
            authErrorP.textContent = '';
            calculationErrorP.textContent = '';
            resultSpan.textContent = '---'; // ログインしたら計算結果をリセット
        } else {
            // ユーザーがログアウトしている場合
            console.log('ログアウト状態');
            authContainer.style.display = 'block';
            appContainer.style.display = 'none';
            userEmailSpan.textContent = '';
        }
    });

    // Firebase Authのエラーコードを日本語メッセージに変換するヘルパー関数
    function getAuthErrorMessage(error) {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'メールアドレスの形式が正しくありません。';
            case 'auth/user-disabled':
                return 'このユーザーアカウントは無効です。';
            case 'auth/user-not-found':
                return 'ユーザーが見つかりません。メールアドレスを確認してください。';
            case 'auth/wrong-password':
                return 'パスワードが間違っています。';
            case 'auth/email-already-in-use':
                return 'このメールアドレスは既に使用されています。';
            case 'auth/weak-password':
                return 'パスワードは6文字以上にしてください。';
            default:
                return '認証エラーが発生しました: ' + error.message;
        }
    }


    // --- 計算処理 (ログインしているユーザーのみアクセス可能) ---
    calculateButton.addEventListener('click', function() {
        // 念のため、現在のユーザーを確認 (基本的にはUIで制御されているはず)
        const currentUser = auth.currentUser;
        if (!currentUser) {
            calculationErrorP.textContent = '計算するにはログインが必要です。';
            return;
        }

        const val1 = parseFloat(num1Input.value);
        const val2 = parseFloat(num2Input.value);
        const val3 = parseFloat(num3Input.value);

        calculationErrorP.textContent = ''; // エラーメッセージをクリア

        if (isNaN(val1) || isNaN(val2) || isNaN(val3)) {
            resultSpan.textContent = '---';
            calculationErrorP.textContent = '有効な数字を3つ入力してください。';
        } else {
            const sum = val1 + val2 + val3;
            resultSpan.textContent = sum;
        }
    });
});