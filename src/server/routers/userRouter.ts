import { z } from 'zod';
import { router, procedure } from '@/lib/trpc';

export const userRouter = router({
    userList: procedure.query(() => {
        return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    })
})