import { Paths } from '../../../../constants/paths';
import { useAppSelector } from '../../../../helpers/hooks/useAppSelector';
import { useDate } from '../../../../helpers/hooks/useDate';
import { DisplayGroup, DisplayTime, UserName } from './styles';

interface Props {
  findCurrentPath: (...arg: string[]) => boolean;
}

const HeaderTime = ({ findCurrentPath }: Props) => {
  const { employee } = useAppSelector((store) => store.employee);

  const { date } = useDate();

  return (
    <DisplayGroup>
      <DisplayTime
        $isWhiteBlack={
          !findCurrentPath(
            Paths.EMPLOYEE_PROJECTS,
            Paths.EMPLOYEE_STAGES_IN_WORK
          )
        }
      >
        {date}
      </DisplayTime>
      {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
        <UserName
          $isWhiteBlack={
            !findCurrentPath(
              Paths.EMPLOYEE_PROJECTS,
              Paths.EMPLOYEE_STAGES_IN_WORK
            )
          }
        >
          {employee && `${employee.firstName} ${employee.lastName}`}
        </UserName>
      )}
    </DisplayGroup>
  );
};

export default HeaderTime;
