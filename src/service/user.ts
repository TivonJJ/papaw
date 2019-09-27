import request from '@/utils/request';

export async function login(params: { username: string, password: string }) {
    // return request.post('user/login', params);
    // 模拟数据
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: {
                    id: Date.now(),
                    username: params.username,
                    name: 'demo' + Math.random(),
                },
            });
        }, 2000);
    });
}
