<?php

namespace App\Controller;

use App\Entity\Client;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
#[Route("/api", name:"api")]

class ClientsController extends AbstractController
{
    #[Route('/clients', name: 'api_clients',methods: ['GET'])]

    public function index(ManagerRegistry $doctrine): Response
    {
        $entityManager =$doctrine->getManager();
        $clients= $entityManager
            ->getRepository(Client::class)
            ->findAll();
        $data = [];
        foreach ($clients as $client){
            $data[]=[
                'id'=> $client->getId(),
                'nom'=> $client->getName(),
                'prenom'=> $client->getLname(),
                'Company'=> $client->getCompanyName(),
                'email'=> $client->getEmail(),
                'etat'=> $client->getEtat(),
                'domaine'=>$client->getDomainName(),

            ];
        }
        return $this->json($data);
    }



#[Route('/clients', name: 'add_clients',methods: ['POST'])]


    public function add(ManagerRegistry $doctrine,Request $request,ValidatorInterface $validator):Response
    {
        $entityManager =$doctrine->getManager();
        $client=new Client();
        $client->setName($request->request->get('nom'));
        $client->setLname($request->request->get('prenom'));
        $client->setCompanyName($request->request->get('Company'));
        $client->setEmail($request->request->get('email'));
        $client->setEtat($request->request->get('etat'));
        //$client->setNomProjet($request->request->get("nomprojet"));
        $client->setDomainName(($request->request->get("domaine")));

        $prenomError=$validator->validateProperty($client,'prenom');
        $companyError=$validator->validateProperty($client,'Company');
        $nomError=$validator->validateProperty($client,'nom');
        $emailError=$validator->validateProperty($client,'email');
        $etatError=$validator->validateProperty($client,'etat');
        $nomDomaineError=$validator->validateProperty($client,'domaine');
        $formErrors = [];
        if (count($nomError)>0) {
            $formErrors['nomError'] = $nomError[0]->getMessage();
        }
        if (count($prenomError)>0) {
            $formErrors['prenomError'] = $prenomError[0]->getMessage();
        }
        if (count($nomError)>0) {
            $formErrors['companyError'] = $companyError[0]->getMessage();
        }
        if (count($emailError)>0) {
            $formErrors['emailError'] = $emailError[0]->getMessage();
        }
if (count($etatError)>0) {
    $formErrors['etatError'] = $etatError[0]->getMessage();
}
        if (count($nomDomaineError)>0) {
            $formErrors['nomDomaineError'] = $nomDomaineError[0]->getMessage();
        }

        if($formErrors) {
            return new JsonResponse($formErrors);
        }


        $entityManager->persist($client);
        $entityManager->flush();
        return $this->json('Created new client successfully with id ' . $client->getId());

    }
    #[Route('/clients/{id}', name: 'client_show',methods: ['GET'])]
public function show(ManagerRegistry $doctrine,int $id): Response{
    $client=$doctrine
        ->getRepository(Client::class)
        ->find($id);
    if (!$client){
        return $this->json('no client found for id',$id,404);
    }
$data=[
    'id'=>$client->getId(),
    'nom'=>$client->getName(),
    'prenom'=>$client->getLname(),
    'Company'=>$client->getCompanyName(),
    'etat'=>$client->getEtat(),
    'email'=>$client->getEmail(),
    'domaine'=>$client->getDomainName(),

];
    return $this->json($data);
}

    #[Route('/clients/{id}', name: 'clients_edit',methods: ['PATCH','PUT'])]

public function edit(ManagerRegistry $doctrine,Request $request, int $id):Response
{
    $entityManager=$doctrine->getManager();
      $client=$entityManager ->getRepository(Client::class)
        ->find($id);
    if(!$client){
        return json("no client found with such an id",$id,404);
    }
    $content= json_decode($request->getContent());
    $client->setName($content->nom);
    $client->setLname($content->prenom);
    $client->setCompanyName($content->Company);
    $client->setEmail($content->email);
    $client->setEtat($content->etat);
    $client->setDomainName($content->domaine);
    $entityManager->flush();

    $data=[
        'id'=>$client->getId(),
        'nom'=>$client->getName(),
        'prenom'=>$client->getLname(),
        'Company'=>$client->getCompanyName(),
        'email'=>$client->getEmail(),
        'etat'=>$client->getEtat(),
        'domain'=>$client->getDomainName(),
    ];
    return $this->json($data);

}
    #[Route('/clients/{id}', name: 'clients_delete',methods: ['DELETE'])]

    public function delete(ManagerRegistry $doctrine,int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json('No project found for id' . $id, 404);
        }

        $entityManager->remove($client);
        $entityManager->flush();

        return $this->json('Deleted a client successfully with id ' . $id);
    }



}
