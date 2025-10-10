// script.js - Conectando com backend Java (Spring Boot)

// Java geralmente roda na porta 8080
const API_URL = 'http://localhost:8080/api';

// Função para fazer login
async function fazerLogin(email, senha) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        if (response.ok) {
            const data = await response.json();
            // Salva o token no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            
            // Redireciona para a dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('E-mail ou senha incorretos!');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Função para cadastrar usuário
async function cadastrarUsuario(usuarioData) {
    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });
        
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao cadastrar usuário');
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Função para buscar oportunidades
async function buscarOportunidades(filtros = {}) {
    try {
        const queryString = new URLSearchParams(filtros).toString();
        const response = await fetch(`${API_URL}/oportunidades?${queryString}`);
        
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Erro ao buscar oportunidades');
            return [];
        }
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

// Função para se candidatar
async function candidatarOportunidade(idOportunidade) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/candidaturas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idOportunidade: idOportunidade })
        });
        
        if (response.ok) {
            alert('Candidatura enviada com sucesso!');
            return true;
        } else {
            alert('Erro ao enviar candidatura');
            return false;
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
        return false;
    }
}

// Verifica se o usuário está logado - CORREÇÃO IMPORTANTE
function verificarLogin() {
    const token = localStorage.getItem('token');
    // CORREÇÃO: !token (se NÃO tem token) e NÃO está nas páginas públicas
    if (!token && !window.location.href.includes('index.html') && 
        !window.location.href.includes('login.html') && 
        !window.location.href.includes('cadastro.html')) {
        window.location.href = 'login.html';
    }
}

// Faz logout
function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}