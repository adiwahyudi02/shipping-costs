import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputBox } from "@/components/commons/InputBox";
import { Button } from "@/components/commons/Button";
import styles from "./CostCheckerForm.module.sass";
import {
  ItemDropdown,
  SearchableInputBox,
} from "@/components/commons/SearchableInputBox";
import { useGetProvincesQuery } from "@/hooks/queries/location/useGetProvincesQuery";
import { useEffect, useMemo, useState } from "react";
import { useGetCitiesQuery } from "@/hooks/queries/location/useGetCitiesQuery";
import { couriersOptions } from "@/constants/courier";
import { useCostMutation } from "@/hooks/queries/cost/useCostMutation";
import { CheckResults } from "@/types/cost";
import { CheckResult } from "../CheckResult";

const validationSchema = yup.object().shape({
  originProvince: yup.string().required("Origin province is required"),
  originCity: yup.string().required("Origin city is required"),
  destinationProvince: yup
    .string()
    .required("Destination province is required"),
  destinationCity: yup.string().required("Destination city is required"),
  weight: yup.string().required("Weight is required"),
  courier: yup.string().required("Courier is required"),
});

interface ICostCheckerForm {
  originProvince: string;
  originCity: string;
  destinationProvince: string;
  destinationCity: string;
  weight: string;
  courier: string;
}

export const CostCheckerForm = () => {
  const [checkResult, setCheckResult] = useState<CheckResults>([]);
  const { control, handleSubmit, watch, setValue } = useForm<ICostCheckerForm>({
    resolver: yupResolver(validationSchema),
  });

  const originProvince = watch("originProvince");
  const destinationProvince = watch("destinationProvince");

  const handleCostCheckerSuccess = (data: CheckResults) => {
    setCheckResult(data);
  };

  const { mutate: mutateCostChecker, isPending: isPendingCostChecker } =
    useCostMutation(handleCostCheckerSuccess);

  const handleCostChecker = async (data: ICostCheckerForm) => {
    mutateCostChecker({
      origin: data.originCity,
      destination: data.destinationCity,
      courier: data.courier,
      weight: data.weight,
    });
  };

  const { data: provinces, isLoading: isLoadingProvinces } =
    useGetProvincesQuery();

  const { data: origincities, isLoading: isLoadingOriginCities } =
    useGetCitiesQuery(
      { province: originProvince },
      { enabled: !!originProvince }
    );

  const { data: destinationcities, isLoading: isLoadingDestinationCities } =
    useGetCitiesQuery(
      { province: destinationProvince },
      { enabled: !!destinationProvince }
    );

  const provincesOptions = useMemo(
    () =>
      (provinces || []).map((item) => ({
        value: item.province_id,
        label: item.province,
      })),
    [provinces]
  );

  const originCitiesOptions = useMemo(
    () =>
      (origincities || []).map((item) => ({
        value: item.city_id,
        label: `${item.type} ${item.city_name}`,
      })),
    [origincities]
  );

  const destinationCitiesOptions = useMemo(
    () =>
      (destinationcities || []).map((item) => ({
        value: item.city_id,
        label: `${item.type} ${item.city_name}`,
      })),
    [destinationcities]
  );

  const handleSelectedSearchableInput = (
    options: ItemDropdown[],
    value: string
  ) => options.find((option) => option.value === value);

  // reset city of origin if province of origin changes
  useEffect(() => {
    setValue("originCity", "");
  }, [originProvince, setValue]);

  // reset city of destination if province of destination changes
  useEffect(() => {
    setValue("destinationCity", "");
  }, [destinationProvince, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit((data) => handleCostChecker(data))}>
        <p className={styles.costCheckerForm__sectionTitle}>Origin</p>
        <div className={styles.costCheckerForm__grid}>
          <Controller
            control={control}
            name="originProvince"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SearchableInputBox
                label="Province"
                options={provincesOptions}
                selected={
                  handleSelectedSearchableInput(provincesOptions, value)!
                }
                onSelect={(data: ItemDropdown) => onChange(data.value)}
                isRequired
                isLoading={isLoadingProvinces}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="originCity"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SearchableInputBox
                label="City/District"
                options={originCitiesOptions}
                selected={
                  handleSelectedSearchableInput(originCitiesOptions, value)!
                }
                onSelect={(data: ItemDropdown) => onChange(data.value)}
                isRequired
                isLoading={isLoadingOriginCities}
                error={error?.message}
                disabled={!originProvince}
              />
            )}
          />
        </div>

        <p className={styles.costCheckerForm__sectionTitle}>Destination</p>
        <div className={styles.costCheckerForm__grid}>
          <Controller
            control={control}
            name="destinationProvince"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SearchableInputBox
                label="Province"
                options={provincesOptions}
                selected={
                  handleSelectedSearchableInput(provincesOptions, value)!
                }
                onSelect={(data: ItemDropdown) => onChange(data.value)}
                isRequired
                isLoading={isLoadingProvinces}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="destinationCity"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SearchableInputBox
                label="City/District"
                options={destinationCitiesOptions}
                selected={
                  handleSelectedSearchableInput(
                    destinationCitiesOptions,
                    value
                  )!
                }
                onSelect={(data: ItemDropdown) => onChange(data.value)}
                isRequired
                isLoading={isLoadingDestinationCities}
                error={error?.message}
                disabled={!destinationProvince}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputBox
              type="number"
              label="Weight"
              suffix="Gram"
              value={value}
              onChange={onChange}
              isRequired
              error={error?.message}
            />
          )}
        />

        <div className={styles.costCheckerForm__courier}>
          <Controller
            control={control}
            name="courier"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SearchableInputBox
                label="Courier"
                options={couriersOptions}
                selected={
                  handleSelectedSearchableInput(couriersOptions, value)!
                }
                onSelect={(data: ItemDropdown) => onChange(data.value)}
                isRequired
                error={error?.message}
              />
            )}
          />
        </div>

        <div className={styles.costCheckerForm__submitButton__wrapper}>
          <Button
            type="submit"
            size="lg"
            isLoading={isPendingCostChecker}
            className={styles.costCheckerForm__submitButton}
          >
            Check Shipping Cost
          </Button>
        </div>
      </form>
      <CheckResult data={checkResult} />
    </>
  );
};
