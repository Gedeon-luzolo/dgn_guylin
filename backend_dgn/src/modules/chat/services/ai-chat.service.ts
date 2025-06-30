import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);
  private readonly geminiApiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    // Utilisez votre clé API Google Gemini
    this.geminiApiKey = this.configService.get<string>("GEMINI_API_KEY") || "";
  }

  async generateResponse(
    userMessage: string,
    context?: string
  ): Promise<string> {
    try {
      const startTime = Date.now();

      // Vérifier que la clé API est disponible
      if (!this.geminiApiKey) {
        throw new Error(
          "Clé API Google Gemini requise pour utiliser le service IA"
        );
      }

      const response = await this.tryGeminiAPI(userMessage, context);

      const endTime = Date.now();
      this.logger.log(`Réponse IA générée en ${endTime - startTime}ms`);

      return response;
    } catch (error) {
      this.logger.error(
        `Erreur lors de la génération de la réponse IA: ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );
      return this.getFallbackResponse(userMessage);
    }
  }

  private async tryGeminiAPI(
    userMessage: string,
    context?: string
  ): Promise<string> {
    try {
      // Construire un prompt optimisé pour les réponses conversationnelles
      const prompt = this.buildConversationalPrompt(userMessage, context);

 
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      const response = await firstValueFrom(
        this.httpService.post(url, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      interface GeminiResponse {
        candidates?: Array<{
          content?: {
            parts?: Array<{
              text?: string;
            }>;
          };
        }>;
      }

      const data = response.data as GeminiResponse;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text || typeof text !== "string" || text.trim().length === 0) {
        throw new Error("Réponse vide de Gemini");
      }

      return this.cleanResponse(text);
    } catch (error) {
      this.logger.warn(
        `❌ Google Gemini échoué: ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );

      // Fallback vers un système de réponses intelligentes
      return this.generateIntelligentFallback(userMessage);
    }
  }

  private buildConversationalPrompt(
    userMessage: string,
    context?: string
  ): string {
    const systemPrompt = `Tu es Guylin, l'assistant virtuel de DGN (Dynamiques Guylin Nyembo). 

INSTRUCTIONS IMPORTANTES :
- Réponds TOUJOURS en français, même si on te parle en anglais
- Sois naturel, amical et conversationnel
- Réponds DIRECTEMENT aux questions, ne donne pas d'explications sur ce que tu devrais répondre
- Tu es un assistant spécialisé dans les informations sur DGN
- Garde tes réponses courtes et pertinentes (maximum 2-3 phrases)
- Si on te demande ton nom ou comment tu t'appelles, dis simplement "Je m'appelle Guylin, je suis l'assistant virtuel de DGN"

À PROPOS DE DGN :
DGN (Dynamiques Guylin Nyembo) est une organisation dédiée au développement et à l'innovation. Nous accompagnons nos membres et partenaires dans différents domaines avec nos services, actualités, et applications.`;

    if (context) {
      return `${systemPrompt}\n\nContexte de conversation: ${context}\n\nUtilisateur: ${userMessage}\n\nGuylin:`;
    }

    return `${systemPrompt}\n\nUtilisateur: ${userMessage}\n\nGuylin:`;
  }

  private cleanResponse(text: string): string {
    let cleaned = text.trim();

    // Supprimer les éventuels artefacts
    cleaned = cleaned.replace(/^(Réponse:|Assistant:|IA:|Guylin:)/i, "").trim();

    // Limiter la longueur si nécessaire
    if (cleaned.length > 800) {
      // Couper à la dernière phrase complète
      const sentences = cleaned.match(/[^.!?]*[.!?]/g);
      if (sentences && sentences.length > 1) {
        cleaned = sentences.slice(0, -1).join("");
      } else {
        cleaned = cleaned.substring(0, 800) + "...";
      }
    }

    // Vérification finale
    if (cleaned.length < 5) {
      throw new Error("Réponse trop courte après nettoyage");
    }

    return cleaned;
  }

  private generateIntelligentFallback(userMessage: string): string {
    const message = userMessage.toLowerCase();

    // Réponses spécifiques à DGN
    if (
      message.includes("dgn") ||
      message.includes("dynamiques") ||
      message.includes("guylin") ||
      message.includes("nyembo")
    ) {
      return "DGN (Dynamiques Guylin Nyembo) est une organisation dédiée au développement et à l'innovation. Nous œuvrons dans différents domaines pour accompagner et soutenir nos membres et partenaires.";
    }

    // Questions sur les services
    if (
      message.includes("service") ||
      message.includes("offre") ||
      message.includes("prestation")
    ) {
      return "DGN propose diverses prestations et services d'accompagnement. Vous pouvez consulter nos différentes sections pour découvrir notre offre complète et nous contacter pour plus de détails.";
    }

    // Questions d'aide et assistance
    if (
      message.includes("aide") ||
      message.includes("assistance") ||
      message.includes("support") ||
      message.includes("problème")
    ) {
      return "Nous sommes là pour vous accompagner. N'hésitez pas à nous préciser votre besoin ou à consulter nos sections dédiées. Notre équipe est disponible pour vous aider.";
    }

    // Informations de contact
    if (
      message.includes("contact") ||
      message.includes("joindre") ||
      message.includes("contacter") ||
      message.includes("téléphone") ||
      message.includes("email") ||
      message.includes("adresse")
    ) {
      return "Pour nous contacter, vous pouvez utiliser les informations disponibles dans notre section contact. Nous serons ravis de répondre à vos questions et demandes.";
    }

    // Adhésion et membres
    if (
      message.includes("membre") ||
      message.includes("adhésion") ||
      message.includes("rejoindre") ||
      message.includes("inscription") ||
      message.includes("devenir")
    ) {
      return "Pour devenir membre de DGN ou en savoir plus sur l'adhésion, consultez notre section membres. Vous y trouverez toutes les informations sur les types de membres et les modalités d'inscription.";
    }

    // Actualités et news
    if (
      message.includes("actualité") ||
      message.includes("news") ||
      message.includes("nouvelle") ||
      message.includes("information") ||
      message.includes("communiqué")
    ) {
      return "Retrouvez toutes nos actualités et communiqués dans la section news de notre site. Nous publions régulièrement des informations sur nos activités et projets.";
    }

    // Applications et outils
    if (
      message.includes("application") ||
      message.includes("outil") ||
      message.includes("logiciel") ||
      message.includes("plateforme")
    ) {
      return "Découvrez nos applications et outils dans la section dédiée. Nous développons diverses solutions pour répondre aux besoins de nos utilisateurs.";
    }

    // Questions générales sur DGN
    if (
      message.includes("qui") ||
      message.includes("quoi") ||
      message.includes("présentation") ||
      message.includes("description")
    ) {
      return "DGN (Dynamiques Guylin Nyembo) est une organisation engagée dans le développement et l'innovation. Explorez notre site pour découvrir nos missions, valeurs et réalisations.";
    }

    // Questions sur le nom de l'assistant
    if (
      message.includes("appelles") ||
      message.includes("appelle") ||
      message.includes("nom") ||
      message.includes("name") ||
      message.includes("qui es-tu") ||
      message.includes("qui est-tu")
    ) {
      return "Je m'appelle Guylin, je suis l'assistant virtuel de DGN (Dynamiques Guylin Nyembo).";
    }

    // Salutations
    if (
      message.includes("bonjour") ||
      message.includes("salut") ||
      message.includes("bonsoir") ||
      message.includes("hello") ||
      message.includes("hey")
    ) {
      return "Bonjour ! Je m'appelle Guylin, je suis l'assistant virtuel de DGN. Je suis là pour vous aider avec vos questions sur notre organisation et nos services. Comment puis-je vous aider aujourd'hui ?";
    }

    // Remerciements
    if (
      message.includes("merci") ||
      message.includes("thanks") ||
      message.includes("thank you")
    ) {
      return "De rien ! N'hésitez pas si vous avez d'autres questions sur DGN ou nos services. Je reste à votre disposition.";
    }

    // Réponse générale enrichie
    return "Merci pour votre question ! Je suis l'assistant virtuel de DGN (Dynamiques Guylin Nyembo). Je peux vous renseigner sur notre organisation, nos services, l'adhésion, nos actualités et bien plus. N'hésitez pas à me poser une question plus spécifique.";
  }

  async generateStreamResponse(
    userMessage: string,
    context?: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    try {
      const response = await this.generateResponse(userMessage, context);

      if (onChunk) {
        // Simuler le streaming en envoyant des chunks
        const words = response.split(" ");
        for (let i = 0; i < words.length; i++) {
          setTimeout(() => {
            onChunk(words.slice(0, i + 1).join(" "));
          }, i * 80); // Plus fluide
        }
      }

      return response;
    } catch (error) {
      this.logger.error(
        `Erreur lors du streaming: ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage?: string): string {
    if (userMessage) {
      return this.generateIntelligentFallback(userMessage);
    }
    return "Je suis l'assistant virtuel de DGN. Comment puis-je vous aider avec des informations sur notre organisation ?";
  }

  async isServiceAvailable(): Promise<boolean> {
    if (!this.geminiApiKey) {
      this.logger.warn("Clé API Google Gemini manquante");
      return false;
    }

    try {
      // Test simple avec HttpService de NestJS
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: "Test",
              },
            ],
          },
        ],
      };

      const response = await firstValueFrom(
        this.httpService.post(url, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      interface TestResponse {
        candidates?: Array<{
          content?: {
            parts?: Array<{
              text?: string;
            }>;
          };
        }>;
      }

      const data = response.data as TestResponse;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text && typeof text === "string" && text.length > 0) {
        return true;
      } else {
        throw new Error("Réponse vide");
      }
    } catch (error) {
      this.logger.error(
        `❌ Service Google Gemini indisponible: ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );
      return false;
    }
  }
}
