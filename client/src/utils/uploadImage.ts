import supabase from "../config/supabase.config";

export const uploadImage = async (file: File, folder = "blog") => {

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error } = await supabase.storage.from("blog").upload(filePath, file)

    if (error) throw error;

    const { data: publicUrlData } = await supabase.storage.from("blog").getPublicUrl(filePath);

    return publicUrlData.publicUrl;

}