import { format } from 'date-fns';
import { Box, Button, Center, Divider, Stack, Table, TableContainer, Tbody, Td, Tr, VStack } from '@chakra-ui/react';

import { useAuth } from '@/hooks';
import { useUserInfoQuery } from '@/queries';

const MyInfoContainer = () => {
  const { data: userInfo } = useUserInfoQuery();
  const { handleLogin, handleLogout } = useAuth();
  const { name, email, point, lastLoginDate } = userInfo ?? {};

  return (
    <>
      {userInfo ? (
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>이름</Td>
                <Td>{name}</Td>
              </Tr>
              <Tr>
                <Td>이메일</Td>
                <Td>{email}</Td>
              </Tr>
              <Tr>
                <Td>가입일</Td>
                <Td>{lastLoginDate && format(lastLoginDate, 'yyyy년 M월 d일')}</Td>
              </Tr>
              <Tr>
                <Td>포인트</Td>
                <Td>{point?.toLocaleString()}점</Td>
              </Tr>
            </Tbody>
          </Table>

          <Stack spacing={5}>
            <Divider />
            <Button type="submit" colorScheme="teal" size="lg" variant="solid" onClick={handleLogout}>
              로그아웃
            </Button>
          </Stack>
        </TableContainer>
      ) : (
        <Center height="80%">
          <VStack>
            <Box color="white" fontSize={90}>
              🦦
            </Box>
            <Button type="button" colorScheme="teal" size="md" variant="solid" onClick={handleLogin}>
              로그인 하기
            </Button>
          </VStack>
        </Center>
      )}
    </>
  );
};

export default MyInfoContainer;
