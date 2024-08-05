package com.worq.worcation.domain.plan.service;

import com.worq.worcation.domain.plan.dto.PlanRequestDto;
import com.worq.worcation.domain.plan.dto.PlanResponseDto;

import java.util.List;

public interface PlanService {
    PlanResponseDto createPlan(final PlanRequestDto planRequestDto);

    void deletePlan( Long planId);

    List<PlanResponseDto> viewPlan(Long dashboardId);

    PlanResponseDto updatePlan(PlanRequestDto planRequestDto, Long planId);
}
