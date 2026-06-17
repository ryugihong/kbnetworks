import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/pricing";

type Props = {
  limit?: number;
  withHeader?: boolean;
};

export function ProcessSection({ limit, withHeader = true }: Props) {
  const steps = limit ? PROCESS_STEPS.slice(0, limit) : PROCESS_STEPS;
  return (
    <section className="container-x py-24 md:py-28">
      {withHeader && (
        <div className="mb-14">
          <SectionHeader
            eyebrow="Process"
            title="속도와 정밀함을 위해 설계된 실행 과정"
            sub="상담부터 그랜드 오픈까지 평균 10~14주. 일정·예산·품질·인허가를 본사 매뉴얼 기반으로 통합 관리합니다."
            max={820}
          />
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.no} delay={(i % 3) * 70}>
            <ProcessStep step={step} i={i} total={steps.length} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
