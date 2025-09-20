import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Adora Craft Marketplace</h1>
      <nav>
        <ul>
          <li><Link href="/ads">Ads</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/favorites">Favorites</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/my-ads">My Ads</Link></li>
          <li><Link href="/notifications">Notifications</Link></li>
          <li><Link href="/post-ad">Post Ad</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
}
