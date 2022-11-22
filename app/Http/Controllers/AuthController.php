<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Dotenv\Exception\ValidationException;
use Illuminate\Validation\Rule as ValidationRule;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        try {
            $user = $request->validate([
                'username' => ['required','min:3','max:200'],
                'phone' => ['required','min:9','numeric'],
                'email' => ['required', 'string', ValidationRule::unique('users', 'email')],
                'password' => ['required','min:6','max:100'],
            ]);
        } catch (ValidationException $th) {
            return $th->validator->errors();
        }

        $state = User::create([
            'name' => $user['username'],
            'phone' => $user['phone'],
            'email' => $user['email'],
            'password' => bcrypt($user['password'])
        ]);
        if ($state) {
            return response()->json(['response' => 'success']);
        } else return response()->json(['response' => 'Error Something Wrong']);
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email', ValidationRule::exists('users', 'email'), 'max:255'],
                'password' => ['required','min:6','max:100'],
            ]);
        }
        catch (ValidationException $th) {
            return $th->validator->errors();
        }

        if (auth()->attempt($credentials)) {
            $user = User::where('email', $credentials['email'])->first();
            $token = $user->createToken('auth')->plainTextToken;
            return response()->json([
                'response' => 'success',
                'user'=> ['name'=>$user['name'],'email'=>$user['email'],'phone'=>$user['phone']],
                'token' => $token
            ]);
        }
        else return response(['errors' => 'The provided credentials do not match our records.']);
    }

    public function index(Request $request){
      return $request->user();
    }

    public function logout(Request $request)
    {
        // Revoke all tokens...
        $request->user()->tokens()->delete();

        // Revoke the token that was used to authenticate the current request...
        // $request->user()->currentAccessToken()->delete();

        // Revoke a specific token...
        // $request->user()->tokens()->where('id', $tokenId)->delete();

        return response()->json(['response' => 'logout']);

    }
}
