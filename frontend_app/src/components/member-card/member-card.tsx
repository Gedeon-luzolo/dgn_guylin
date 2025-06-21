import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { CardContent } from "@/components/ui/card";

interface MemberCardProps {
  memberData: {
    nom: string;
    postNom: string;
    prenom: string;
    qualiteMembre: string;
    province: string;
    adresse: string;
    photo: string | null;
  };
}

export const MemberCard: React.FC<MemberCardProps> = ({ memberData }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  // Réduire les données pour le QR Code
  const qrCodeData = JSON.stringify({
    n: memberData.nom,
    pn: memberData.postNom,
    p: memberData.prenom,
    q: memberData.qualiteMembre,
    pr: memberData.province,
    d: formattedDate,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Carte avec motif de sécurité en arrière-plan */}
      <div className="relative aspect-[1.8/1] bg-[#0046B6] rounded-lg overflow-hidden shadow-2xl">
        {/* Motif de sécurité */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #ffffff 0px,
              #ffffff 2px,
              transparent 2px,
              transparent 8px
            ),
            repeating-linear-gradient(
              -45deg,
              #ffffff 0px,
              #ffffff 2px,
              transparent 2px,
              transparent 8px
            )`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Motif ondulé */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C 30 0, 70 0, 100 10 C 70 20, 30 20, 0 10' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <CardContent className="p-0">
          {/* Header avec logo et drapeau */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-[var(--dgn-dark-blue)] flex items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <img
                src="/src/assets/images/logo/logo_dgn.png"
                alt="DGN Logo"
                className="h-12 w-12 object-contain"
              />
              <div className="text-white">
                <div className="text-xs font-semibold">
                  République Démocratique du Congo
                </div>
                <div className="text-sm font-bold tracking-wide">
                  DYNAMIQUE GUYLAIN NYEMBO
                </div>
                <div className="text-[10px] font-medium">
                  COORDINATION PROVINCIALE DE KINSHASA
                </div>
              </div>
            </div>
            <img
              src="/src/assets/images/flag.png"
              alt="RDC Flag"
              className="h-8 w-12 object-cover"
            />
          </div>

          {/* Numéro de carte */}
          <div className="absolute top-16 left-0 right-0 h-12 bg-[#FF0000] flex items-center px-4">
            <div className="text-white text-xl font-bold tracking-wider">
              CARTE DE MEMBRE N° _____ / _____
            </div>
          </div>

          {/* Contenu principal */}
          <div className="absolute top-28 left-0 right-0 bottom-0 flex">
            {/* Photo */}
            <div className="w-1/4 p-4">
              <div className="w-full aspect-square bg-[#FFEB3B] rounded-none border-2 border-white/30 overflow-hidden">
                {memberData.photo ? (
                  <img
                    src={memberData.photo}
                    alt="Member"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
            </div>

            {/* Informations */}
            <div className="flex-1 p-4">
              <div className="space-y-1.5 text-white">
                <div className="flex items-center">
                  <span className="w-24 text-sm font-semibold">NOM</span>
                  <span className="flex-1 border-b border-white/30">
                    : {memberData.nom}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-semibold">POST-NOM</span>
                  <span className="flex-1 border-b border-white/30">
                    : {memberData.postNom}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-semibold">PRENOM</span>
                  <span className="flex-1 border-b border-white/30">
                    : {memberData.prenom}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-semibold">QUALITE</span>
                  <span className="flex-1 border-b border-white/30">
                    : {memberData.qualiteMembre}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-semibold">PROVINCE</span>
                  <span className="flex-1 border-b border-white/30">
                    : {memberData.province}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-semibold">ADRESSE</span>
                  <span className="flex-1 border-b border-white/30">
                    : {memberData.adresse}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="w-1/4 p-4 flex flex-col items-center justify-center">
              <QRCodeSVG
                value={qrCodeData}
                size={120}
                level="H"
                includeMargin={true}
                className="bg-white p-1 rounded-sm"
              />
              <div className="mt-2 text-center text-white text-xs">
                <div className="font-medium">COORDONNATEUR NATIONAL</div>
                <div className="font-bold">Guylain NYEMBO M.</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/5 flex items-center justify-between px-4">
            <div className="text-xs text-white/90 italic">
              Cette carte est renouvelable après 1 an.
            </div>
            <div className="text-xs text-white/90">
              Délivrée à Kinshasa, le {formattedDate}
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};
