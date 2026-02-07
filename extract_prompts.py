import re

def extract_user_prompts(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        prompts = []
        is_in_user_block = False
        current_prompt = []

        for line in lines:
            stripped_line = line.strip()

            # Détecter le début d'un bloc utilisateur
            if stripped_line.startswith("### User Input"):
                is_in_user_block = True
                # Si on avait un prompt en cours (cas rare de deux inputs de suite), on l'ajoute
                if current_prompt:
                    prompts.append("\n".join(current_prompt))
                    current_prompt = []
                continue

            # Détecter la fin du bloc (nouvelle section Planner ou autre header)
            if stripped_line.startswith("###") and is_in_user_block:
                is_in_user_block = False
                if current_prompt:
                    prompts.append("\n".join(current_prompt))
                    current_prompt = []
                continue

            # Si on est dans un bloc utilisateur, on capture le texte
            if is_in_user_block:
                # On ignore les lignes vides
                if not stripped_line:
                    continue
                
                # On ignore les logs système (commençant et finissant par *)
                # ex: *Viewed [package.json]* ou *User accepted command...*
                if stripped_line.startswith("*") and stripped_line.endswith("*"):
                    continue
                
                # On ignore les commandes brutes affichées parfois après l'input
                if stripped_line.startswith(">"):
                    continue

                current_prompt.append(stripped_line)

        # Ajouter le dernier prompt si le fichier finit sur un bloc utilisateur
        if current_prompt:
            prompts.append("\n".join(current_prompt))

        # Écriture dans le fichier de sortie
        with open(output_file, 'w', encoding='utf-8') as out:
            for i, prompt in enumerate(prompts, 1):
                out.write(f"{prompt}\n")
                out.write("-" * 40 + "\n") # Séparateur visuel

        print(f"Succès ! {len(prompts)} prompts ont été extraits dans '{output_file}'.")

    except FileNotFoundError:
        print(f"Erreur : Le fichier '{input_file}' est introuvable.")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")

# --- Configuration ---
input_filename = "prompts.md" # Le nom de votre fichier source
output_filename = "mes_prompts.txt"                   # Le nom du fichier de résultat

if __name__ == "__main__":
    extract_user_prompts(input_filename, output_filename)