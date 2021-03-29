// 로딩 시 사용자 정보를 가져오는 함수
async function getUser() {
    try {
        //users에서 사용자 정보를 가져옴.
        const res = await axios.get('/users');
        const users = res.data;

        //프론트에서 보여줄 리스트 생성.
        const list = document.getElementById('list');
        list.innerHTML =``;

        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            console.log("key: ", key)
            const userDiv = document.createElement('div');
            const span = document.createElement('span');

            //각각의 이름을 넣는다.
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';

            // 클릭하면 이벤트 생성.
            edit.addEventListener('click', async () => {
                const name = prompt('바꿀 이름을 입력하세요.');
                if (!name) {
                    return alert('이름을 입력하세요.');
                };
                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (e) {
                    console.error(e);
                };
            });

            //삭제 버튼 생성.
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                try {
                    // 클릭할 시, user/key를 통해 삭제 요청.
                    await axios.delete('/user/' + key);
                    // 이후 다시 함수 호출하여 리스트 업데이트.
                    getUser();
                } catch(e) {
                    console.error(e);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    } catch(e) {
        console.error(e);
    };
};

window.onload = getUser;
// 폼 제출 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert('이름을 입력하세요.');
    };
    try {
        await axios.post('/user', { name });
        getUser();
    } catch (e) {
        console.error(e);
    };
    e.target.username.value = '';
});