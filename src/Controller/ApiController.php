<?php



namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
class ApiController extends AbstractController
{
    #[Route(path: '/api/login_check', name: 'login')]
    public function index(AuthenticationUtils $authenticationUtils): Response
    {
        $token = $this->tokenStorage->getToken();
        $uniqueness = $token->getUsername();
        return new JsonResponse($this->pickProfileApiWorker->pick($uniqueness));
    }
}
