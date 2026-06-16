import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/pricing";

type Props = {
  /** limit steps (e.g. home teaser). default: all */
  limit?: number;
  withHeader?: boolean;
};

export function ProcessSection({ limit, withHeader = true }: Props) {
  const steps = limit ? PROCESS_STEPS.slice(0, limit) : PROCESS_STEPS;
  return (
    <section className="container-x py-20 md:py-28">
      {withHeader && (
        <SectionHeader
          eyebrow="Execution Process"
          title={
            <>
              최고의 매장은 추측이 아니라,
              <br />
              <span className="text-gradient">검증된 과정</span>에서 나옵니다.
            </>
          }
          sub="상담부터 그랜드 오픈까지 평균 10~14주. 일정·예산·품질·인허가를 본사 매뉴얼 기반으로 통합 관리해 시행착오를 최소화합니다."
        />
      )}
      <div className="mt-12">
        {steps.map((step, i) => (
          <Reveal key={step.no} delay={(i % 2) * 60}>
            <ProcessStep step={step} last={i === steps.length - 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
