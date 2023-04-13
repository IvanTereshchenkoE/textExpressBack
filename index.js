const express = require('express');
const cors = require('cors'); // импортируем пакет cors
const app = express();

function generate(str) {
    return str.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

// Моковая база данных
let catalog = [
  { id: "b99fdbaa-e4de-448f-96ef-46cecbc495d4", name: 'Product 1', price: 10.99 },
  { id: "691f4b55-e954-497f-bd97-4944ec9b58c7", name: 'Product 2', price: 20.99 },
  { id: "9d938708-5b54-405b-bdb7-587051a6320b", name: 'Product 3', price: 30.99 }
];

// Разрешаем отправку данных в формате JSON
app.use(express.json());

// Настраиваем CORS
app.use(cors());

// Маршрут для получения всего каталога
app.get('/catalog', (req, res) => {
  res.json(catalog);
});

app.post('/catalog', (req, res) => {
    const { name, price } = req.body;
    
    // Генерируем уникальный id для нового продукта
    const id = generate('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx');
    
    // Создаем новый продукт и добавляем его в каталог
    const product = { id, name, price };
    catalog.push(product);
    
    res.json(catalog);
  });

app.delete('/catalog/:id', (req, res) => {
    const { id } = req.params;
    
    // Ищем продукт в каталоге по его id
    catalog = catalog.filter(item => item.id !== id);
    
    // Если продукт найден, удаляем его
    res.json(catalog);
  });

  // Маршрут для обновления продукта по его id
app.put('/catalog/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  
  catalog.forEach(item => {
    if (item.id === id) {
      item.name = name;
      item.price = price;
    }
  });
  res.json(catalog);
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});