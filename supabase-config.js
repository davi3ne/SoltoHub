// supabase-config.js
// Configurações do Supabase para produção (Netlify).
// Se preenchidos, o sistema funcionará em modo nuvem com Supabase Auth e Banco de Dados.
// Se deixados em branco, o sistema funcionará em modo local conectando-se ao server.js local.
window.SUPABASE_CONFIG = {
    supabaseUrl: localStorage.getItem('hub_supabase_url') || "", // Ex: "https://xxxx.supabase.co"
    supabaseKey: localStorage.getItem('hub_supabase_key') || "", // Ex: "eyJhbGciOi..." (Anon Key pública)
    supabaseBucket: localStorage.getItem('hub_supabase_bucket') || "media" // Nome do bucket de storage
};
