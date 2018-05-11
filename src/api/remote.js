const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function getYearBalance(year){
    if(localStorage.getItem('authToken')){
        try{
            const res = await fetch(host + 'plan/' + year, {
                method: 'GET',
                headers: {
                    'Authorization' : 'bearer ' + localStorage.getItem('authToken')
                }
            });
            return await res.json()
    
        }catch(err){
            return err
        }
    }   
}

async function getMonthBalance(year,month){
    if(localStorage.getItem('authToken')){
        try{
            const res = await fetch(host + 'plan/' + year + '/' + month, {
                method: 'GET',
                headers: {
                    'Authorization' : 'bearer ' + localStorage.getItem('authToken')
                }
            });
            return await res.json()
            
        }catch(err){
            return err
        }
    }
}

export { register, login, getYearBalance, getMonthBalance };