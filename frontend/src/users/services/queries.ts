import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { Option } from '../../types/option';


export function useStates() {
    return useQuery({
        queryKey: ['states'],
        queryFn: () =>
            axios
                .get<Option[]>('http://localhost:8080/states')
                .then((res) => res.data),
    });
}

export function useLanguages() {
    return useQuery({
        queryKey: ['languages'],
        queryFn: () =>
            axios
                .get<Option[]>('http://localhost:8080/languages')
                .then((res) => res.data),
    });
}