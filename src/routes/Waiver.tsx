import React from 'react';
import { tournamentParticipationAgreement, effectiveDate } from '../constants/legalTexts';

const Waiver: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tournament Participation Agreement</h1>
        <p className="text-slate-400 mb-8">{effectiveDate}</p>
        <article className="prose prose-invert max-w-none">
          {tournamentParticipationAgreement.split('\n').map((line, idx) => (
            <p key={idx} className="text-slate-300 whitespace-pre-wrap leading-relaxed">{line}</p>
          ))}
        </article>
      </div>
    </div>
  );
};

export default Waiver;
