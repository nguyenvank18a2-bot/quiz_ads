export type Role="admin"|"user";
export type Profile={id:string;display_name:string;icon_balance:number;role:Role;is_banned:boolean;created_at:string};
export type QuestionStatus="published"|"draft"|"hidden";
export type Difficulty="easy"|"medium"|"hard";
export type Question={id:number;question:string;choices:string[];correct_answer:number;explanation:string;category:string;category_id:number|null;difficulty:Difficulty;status:QuestionStatus;sort_order:number;created_at:string;updated_at:string};
export type Progress={question_id:number;selected_answer:number;is_correct:boolean};
export type Category={id:number;name:string;created_at:string;updated_at:string};
export type AdminUser={id:string;email:string;display_name:string;role:Role;icon_balance:number;is_banned:boolean;created_at:string;completed_count:number};
