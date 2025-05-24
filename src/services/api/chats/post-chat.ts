import { supabaseClient } from '@/utils/supabase'; 
import { TChat, TChatForm } from '../../../types/chat.types'; 

/**
 * Creates a new chat between two users or returns an existing one.
 * 
 * @param user2Id - The ID of the second user
 * @returns A chat object with fields id, user1_id, and user2_id
 * @throws Errors when creating or fetching the chat
 */

export const postChat = async (user2Id: string): Promise<TChat> => {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const user1Id = user.id;

        // Check if a chat already exists between user1Id and user2Id
        const { data: existingChat, error: fetchError } = await supabaseClient
            .from('chats')
            .select('id, user1_id, user2_id')
            .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error checking existing chat:', fetchError.message);
            throw new Error(fetchError.message);
        }

        if (existingChat) {
            return existingChat as TChat;
        }

        // Create a new chat with sorted user1_id and user2_id for uniqueness
        const chatData: TChatForm = {
            user1_id: user1Id < user2Id ? user1Id : user2Id,
            user2_id: user1Id < user2Id ? user2Id : user1Id,
        };

        const { data, error } = await supabaseClient
            .from('chats')
            .insert(chatData)
            .select('id, user1_id, user2_id')
            .single();

        if (error) {
            console.error('Error creating chat:', error.message);
            throw new Error(error.message);
        }

        return data as TChat;
    } catch (error) {
        console.error('Unexpected error in postChat:', error);
        throw error;
    }
};