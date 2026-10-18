export type Program = {
    id: number;
    name: string;
    active: boolean;
    public: boolean;
    archived_at: string | null;
    created_at: string;
};

export type ProgramInput = {
    name: string;
    active: boolean;
    public: boolean;
};