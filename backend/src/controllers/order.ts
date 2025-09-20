import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      items, total, payment, email, phone, address,
    } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: 'Массив товаров пуст или не передан' });
    }
    const products = await Product.find({
      _id: { $in: items },
      price: { $ne: null },
    });
    if (products.length !== items.length) {
      return res
        .status(400)
        .json({ message: 'Некорректные товары или цена отсутствует' });
    }
    const sum = products.reduce(
      (acc: number, p: any) => acc + (p.price || 0),
      0,
    );
    if (sum !== total) {
      return res
        .status(400)
        .json({ message: 'Сумма заказа не совпадает с total' });
    }
    if (!['card', 'online'].includes(payment)) {
      return res.status(400).json({ message: 'Некорректный способ оплаты' });
    }
    if (!email || !phone || !address) {
      return res.status(400).json({ message: 'Не все поля заполнены' });
    }
  return res.status(201).json({ id: faker.string.uuid(), total });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
