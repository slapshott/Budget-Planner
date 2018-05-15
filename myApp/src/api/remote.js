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

async function updateValues(year, month, income, budget){
    try{
        const res = await fetch(host + 'plan/' + year + '/' + month, {
            method: 'POST',
            headers: {
                'Authorization' : 'bearer ' + localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                income, 
                budget
            })
        })
        return await res.json()

    }catch(err){
        return err
    }
}  

async function addExpense(year,month,date,name,category,amount){
    try{
        const res = await fetch(host + 'plan/' + year + '/' + month + '/expense', {
            method: 'POST',
            headers: {
                'Authorization' : 'bearer ' + localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                name,
                category,
                amount 
            })    
        })
        return await res.json()

    }catch(err){
        return err
    }
}

async function deleteExpense(expenseId){
    try{
        const res = await fetch(host + 'plan/expense/' + expenseId , {
            method: 'DELETE',
            headers: {
                'Authorization' : 'bearer ' + localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            }

        })
        return await res.json()

    }catch(err){
        return err
    }
}


export { register, login, getYearBalance, getMonthBalance, updateValues, addExpense, deleteExpense };