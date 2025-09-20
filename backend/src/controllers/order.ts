import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      items, total, payment, email, phone, address,
    } = req.body;

    // Проверка массива товаров
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: 'Массив товаров пуст или не передан' });
    }

    // Поиск товаров в базе данных
    const products = await Product.find({
      _id: { $in: items },
      price: { $ne: null },
    });

    // Проверка корректности товаров
    if (products.length !== items.length) {
      return res
        .status(400)
        .json({ message: 'Некорректные товары или цена отсутствует' });
    }

    // Расчет суммы заказа
    const sum = products.reduce(
      (acc: number, p: any) => acc + (p.price || 0),
      0,
    );

    // Проверка соответствия суммы
    if (sum !== total) {
      return res
        .status(400)
        .json({ message: 'Сумма заказа не совпадает с total' });
    }

    // Проверка способа оплаты
    if (!['card', 'online'].includes(payment)) {
      return res.status(400).json({ message: 'Некорректный способ оплаты' });
    }

    // Проверка обязательных полей
    if (!email || !phone || !address) {
      return res.status(400).json({ message: 'Не все поля заполнены' });
    }

    // Успешное создание заказа
    return res.status(201).json({ id: faker.string.uuid(), total });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
