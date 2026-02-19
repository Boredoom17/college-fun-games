import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get existing user or create new one
export const getOrCreateUser = async (email) => {
  try {
    const { data: existing, error } = await supabase
      .from("participants")
      .select("*")
      .eq("user_email", email)
      .single();

    if (existing) return existing;

    const { data: newUser, error: insertError } = await supabase
      .from("participants")
      .insert([{ user_email: email }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newUser;
  } catch (err) {
    console.error("Error getOrCreateUser:", err);
    return null;
  }
};

// Update current level
export const updateUserProgress = async (email, level) => {
  try {
    const { data, error } = await supabase
      .from("participants")
      .update({ current_level: level })
      .eq("user_email", email)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error updateUserProgress:", err);
    return null;
  }
};

// Complete level and unlock next
export const completeLevel = async (email, level) => {
  try {
    const { data: user, error } = await supabase
      .from("participants")
      .select("completed_levels")
      .eq("user_email", email)
      .single();

    if (error) throw error;

    const completed = JSON.parse(user.completed_levels || "[]");
    if (!completed.includes(level)) completed.push(level);

    const { data, error: updateError } = await supabase
      .from("participants")
      .update({
        completed_levels: JSON.stringify(completed),
        current_level: level + 1,
      })
      .eq("user_email", email)
      .select()
      .single();

    if (updateError) throw updateError;
    return data;
  } catch (err) {
    console.error("Error completeLevel:", err);
    return null;
  }
};

// Assign participant number 
export const assignParticipantNumber = async (email) => {
  try {
    const { data: currentUser } = await supabase
      .from("participants")
      .select("participant_number")
      .eq("user_email", email)
      .single();

    if (currentUser?.participant_number !== null) {
      return currentUser;
    }

    const { count, error } = await supabase
      .from("participants")
      .select("*", { count: "exact", head: true })
      .not("participant_number", "is", null);

    if (error) throw error;

    const nextNumber = (count || 0) + 1;

    const { data, error: updateError } = await supabase
      .from("participants")
      .update({ participant_number: nextNumber })
      .eq("user_email", email)
      .select()
      .single();

    if (updateError) throw updateError;
    return data;
  } catch (err) {
    console.error("Error assignParticipantNumber:", err);
    return null;
  }
};
