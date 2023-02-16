import PocketBase, { Record } from 'pocketbase';
import { QueryClient } from '@tanstack/react-query';

const pb = new PocketBase(process.env.DB_HOST);

export default pb;