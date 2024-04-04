import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export const getSortingIcon = (state: string | false) => {
    switch (state) {
        case 'asc':
            return (
                <ChevronUp
                    size={20}
                    className='cursor-pointer'
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                />
            );
        case 'desc':
            return (
                <ChevronDown
                    size={20}
                    className='cursor-pointer'
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                />
            );
        default:
            return (
                <ChevronsUpDown
                    size={20}
                    className='cursor-pointer'
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                />
            );
    }
};

export const getExpandedIcon = (state: boolean) =>
    state ? (
        <ChevronUp
            size={28}
            strokeWidth={1.5}
            absoluteStrokeWidth
            className='cursor-pointer'
        />
    ) : (
        <ChevronDown
            size={28}
            strokeWidth={1.5}
            absoluteStrokeWidth
            className='cursor-pointer'
        />
    );

export const sortingPriorityElement = (sortingIndex: number) =>
    sortingIndex > 0 && (
        <div
            className={`inline-flex relative w-5 h-5 bg-slate-400 rounded-full justify-center items-center `}
        >
            <p className='text-center h-max text-white text-[10px] font-breuer-bold '>
                {sortingIndex}
            </p>
        </div>
    );
