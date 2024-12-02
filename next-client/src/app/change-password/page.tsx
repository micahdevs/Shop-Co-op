import Link from 'next/link';

const ChangePasswordPage = () => {
  const token = 'generated-reset-token';

  return (
	<>
    <div>
      <h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <Link href={`/change-password/${token}`}>Reset Password</Link>
    </div>
	</>
  );
};

export default ChangePasswordPage;
