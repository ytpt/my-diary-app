'use client';

import Image from 'next/image';
import { deleteDuty } from '../app/actions';

export default function DeleteButton({ duty }: {duty: string}) {
    return (
        <button onClick={() => deleteDuty(duty)}>
            <Image src="/images/delete.svg" width={20} height={20} alt="Delete icon"/>
        </button>
    );
};
