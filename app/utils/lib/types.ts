interface AuthInputs {
    email?: string;
    password: string;
    primary_phone?: string;
    name?: string;
    username?: string;
}

interface userSavedData {
    user_id?: string;
    data_type: string;
    encrypted_data: string;
    data_hash?: string;
    email?: string;
}

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    is_email_verified: boolean;
    date_of_birth: string;
    address: string;
}

interface Organization {
   organization_name:string;
   contact_name: string;
   contact_email: string;
   document_type: string;
   document_reference: string;
   document_storage_url: string;
   password:string;
}

interface Requesting {
    description: string;
    data_type: string[];
    email: string;
    minutes: number;
}


export type { AuthInputs, userSavedData, UserProfile, Organization, Requesting };




