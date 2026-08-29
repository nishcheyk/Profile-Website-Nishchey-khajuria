import React from 'react';
import { motion } from 'framer-motion';
import { VscTerminal } from 'react-icons/vsc';
import { SaasSection, SaasSectionHeading } from '../../../components/ui/SaasSection';

const sampleCode = `// AI Infrastructure Layer
export class RAGPipeline {
  constructor(private vectorDB: VectorStore, private llm: LLMModel) {}

  async processQuery(userQuery: string): Promise<Response> {
    const embeddings = await this.llm.createEmbeddings(userQuery);
    const context = await this.vectorDB.similaritySearch(embeddings, 5);
    
    return this.llm.generate({
      prompt: this.buildPrompt(userQuery, context),
      temperature: 0.2,
      maxTokens: 2048,
    });
  }

  private buildPrompt(query: string, context: Document[]): string {
    return \`Context:\\n\${context.join('\\n')}\\n\\nQuery: \${query}\`;
  }
}`;

export const CodeShowcase = () => {
  return (
    <SaasSection id="projects" center>
      <SaasSectionHeading title="Code that speaks for itself." subtitle="Type-safe, highly optimized, and ready to scale to millions of users on day one." />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
        whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-200/50 bg-[#0d1117] relative perspective-[1000px]"
      >
        {/* Mac OS Window Header */}
        <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2 backdrop-blur-md sticky top-0 z-10">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <div className="ml-4 flex items-center gap-2 text-white/40 text-xs font-mono font-medium">
            <VscTerminal size={14} /> pipeline.ts
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-relaxed">
            <code className="text-slate-300">
              {sampleCode.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-slate-600 text-right pr-6 select-none">{i + 1}</span>
                  <span className="table-cell">
                    {/* Basic syntax highlighting simulation */}
                    {line.replace(/export class|constructor|async|private|Promise|return|await/g, match => `\x00${match}\x00`)
                         .split('\x00')
                         .map((part, j) => {
                           if (['export class', 'constructor', 'async', 'private', 'Promise', 'return', 'await'].includes(part)) {
                             return <span key={j} className="text-pink-400 font-medium">{part}</span>;
                           }
                           if (part.includes('(') || part.includes(')')) {
                               return <span key={j} className="text-blue-300">{part}</span>;
                           }
                           if (part.includes('//')) {
                               return <span key={j} className="text-slate-500 italic">{part}</span>;
                           }
                           return part;
                         })}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </motion.div>
    </SaasSection>
  );
};
