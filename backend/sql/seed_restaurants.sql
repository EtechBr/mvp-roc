-- Seed: 25 Restaurantes parceiros ROC Passaporte
-- Execute este script no Supabase SQL Editor
-- Estes restaurantes correspondem exatamente aos exibidos no carrossel da landing page

-- Limpar restaurantes existentes (opcional - descomente se necessário)
-- DELETE FROM restaurants;

INSERT INTO restaurants (name, city, discount_label, image_url, category, description, active) VALUES
-- Porto Velho (8 restaurantes)
('Restaurante Sabor do Norte', 'Porto Velho', '20% OFF', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Sabores autênticos da culinária do Norte do Brasil', true),
('Cantina Italiana', 'Porto Velho', '15% OFF', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&q=80', 'Italiana', 'Massas artesanais e receitas tradicionais italianas', true),
('Churrascaria Gaúcha', 'Porto Velho', '25% OFF', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80', 'Churrascaria', 'O melhor churrasco gaúcho da região', true),
('Sushi House', 'Porto Velho', '30% OFF', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&q=80', 'Japonesa', 'Culinária japonesa com ingredientes frescos', true),
('Pizzaria Forno a Lenha', 'Porto Velho', '20% OFF', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&q=80', 'Pizzaria', 'Pizzas artesanais assadas em forno a lenha', true),
('Churrascaria Premium', 'Porto Velho', '25% OFF', 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80', 'Churrascaria', 'Cortes nobres e atendimento premium', true),
('Restaurante Mar e Terra', 'Porto Velho', '20% OFF', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Frutos do mar e pratos da terra', true),
('Bistrô Francês', 'Porto Velho', '30% OFF', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80', 'Francesa', 'Alta gastronomia francesa em ambiente sofisticado', true),

-- Ji-Paraná (5 restaurantes)
('Restaurante Beira Rio', 'Ji-Paraná', '15% OFF', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Vista para o rio com pratos regionais', true),
('Café Central', 'Ji-Paraná', '10% OFF', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&q=80', 'Cafeteria', 'Cafés especiais e doces artesanais', true),
('Bistrô Moderno', 'Ji-Paraná', '20% OFF', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80', 'Contemporânea', 'Cozinha contemporânea com ingredientes locais', true),
('Café Gourmet', 'Ji-Paraná', '10% OFF', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&q=80', 'Cafeteria', 'Experiência gourmet em cafés selecionados', true),
('Restaurante Árabe', 'Ji-Paraná', '20% OFF', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&q=80', 'Árabe', 'Sabores autênticos do Oriente Médio', true),

-- Ariquemes (4 restaurantes)
('Restaurante Tropical', 'Ariquemes', '15% OFF', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Culinária brasileira em ambiente tropical', true),
('Lanchonete Express', 'Ariquemes', '10% OFF', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80', 'Fast Food', 'Lanches rápidos e saborosos', true),
('Pizzaria Artesanal', 'Ariquemes', '20% OFF', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80', 'Pizzaria', 'Pizzas artesanais com ingredientes selecionados', true),
('Cantina Mexicana', 'Ariquemes', '15% OFF', 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400&h=300&fit=crop&q=80', 'Mexicana', 'Sabores picantes da culinária mexicana', true),

-- Vilhena (4 restaurantes)
('Restaurante do Vale', 'Vilhena', '20% OFF', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Comida caseira com sabor do interior', true),
('Cantina Mineira', 'Vilhena', '15% OFF', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Autêntica culinária mineira', true),
('Restaurante Vegetariano', 'Vilhena', '15% OFF', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80', 'Vegetariana', 'Opções saudáveis e naturais', true),
('Restaurante Japonês', 'Vilhena', '25% OFF', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&q=80', 'Japonesa', 'Sushis e sashimis preparados na hora', true),

-- Cacoal (4 restaurantes)
('Sabor Caseiro', 'Cacoal', '10% OFF', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Comida caseira como da vovó', true),
('Restaurante Família', 'Cacoal', '15% OFF', 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop&q=80', 'Brasileira', 'Ambiente familiar e pratos generosos', true),
('Lanchonete 24h', 'Cacoal', '10% OFF', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80', 'Fast Food', 'Aberto 24 horas para sua conveniência', true),
('Churrascaria Rodízio', 'Cacoal', '20% OFF', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80', 'Churrascaria', 'Rodízio completo de carnes nobres', true)
ON CONFLICT DO NOTHING;

-- Verificar inserção
SELECT COUNT(*) as total_restaurantes FROM restaurants;
SELECT city, COUNT(*) as quantidade FROM restaurants GROUP BY city ORDER BY quantidade DESC;
