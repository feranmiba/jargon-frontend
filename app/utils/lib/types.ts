interface AuthInputs {
    email?: string;
    password: string;
    primary_phone?: string;
    name?: string;
    username?: string;
}

interface userSavedData {
    user_id: string;
    datat_type: string;
    encrypted_data: string;
    data_hash: string;

}



export type { AuthInputs };




