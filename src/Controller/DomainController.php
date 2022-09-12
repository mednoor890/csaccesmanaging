<?php

namespace App\Controller;

use App\Entity\Domaine;
use App\Entity\Clients;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route("/api", name:"api")]

class DomainController extends AbstractController
{
    #[Route('/domain', name: 'app_domain',methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $domains = $entityManager
            ->getRepository(Domaine::class)
            ->findAll();
        $data = [];
        foreach ($domains as $domain) {
            $data[] = [
                'id' => $domain->getId(),
                'clientProprietaire' => $domain->getClientProp(),
                'date_cre' => $domain->getDateAct(),
                'date_fin' => $domain->getDateFin(),
                'hebergeur' => $domain->getHebergeur(),
                'nom' => $domain->getDomainName(),
                //'statut' => $domain->getStatut(),
            ];

        }
        return $this->json($data);
    }

    #[Route('/domain', name: 'domain_add', methods: ['POST'])]
    public function add(ManagerRegistry $doctrine, Request $request ):Response
    {
        $entityManager = $doctrine->getManager();
        $domain=new Domaine();

        //$answer->setQuestion($question);
        //$question->setQuestion('... I should not have done this...');
//$domaine->setClient($request->request->get('Owner Client'));



       // $domain->addClientProprietaire($request->request->get("clientProprietaire"));

        $domain->setClientProp($request->request->get("clientProprietaire"));
        $domain->setHebergeur($request->request->get('hebergeur'));
        //$domain->setStatut($request->request->get('statut'));
        $domain->setDateAct($request->request->get('dateAct'));
        $domain->setDateFin($request->request->get('dateFin'));
        $domain->setDomainName($request->request->get('DomainName'));
        $entityManager->persist($domain);
        $entityManager->flush();
        return $this->json('Created new domain successfully with id ' . $domain->getId());
       // $ClientProprietaireError=$validator->validateProperty($domaine,'Owner Client');
       // $hebergeurError = $validator->validateProperty($domaine, 'Hosting Company');
        //$statutError = $validator->validateProperty($domaine, 'State');
        //$DateCreError = $validator->validateProperty($domaine, 'Creation Date');
        //$DateEndError = $validator->validateProperty($domaine, 'End Date');

        //$formErrors = [];
        //if (count($ClientProprietaireError) > 0) {
          //  $formErrors['ClientProprietaireError'] = $ClientProprietaireError[0]->getMessage();
        //}
        //if (count($hebergeurError) > 0) {
          //  $formErrors['hebergeurError'] = $hebergeurError[0]->getMessage();
        //}
        //if (count($statutError) > 0) {
          //  $formErrors['statutError'] = $statutError[0]->getMessage();
        //}
        //if (count($DateCreError) > 0) {
          //  $formErrors['DateCreError'] = $DateCreError[0]->getMessage();
        //}
        /*if (count($DateEndError) > 0) {
            $formErrors['DateEndError'] = $DateEndError[0]->getMessage();
        }


        if ($formErrors) {
            return new JsonResponse($formErrors);
        }
*/



    }

    #[Route('/domain/{id}', name: 'api_edit', methods: ['PATCH'])]
    public function edit(Request $request, ManagerRegistry $doctrine, $id): Response
    {
        $entityManager = $doctrine->getManager();
        $domain = $entityManager->getRepository(Domaine::class)
            ->find($id);
        if (!$id) {
            return json("no Data found for the id" , $id,404);
        }
        $content= json_decode($request->getContent());
        $domain->setHebergeur($content->hebergeur);
        $domain->setDomainName($content->nom);
        $domain->setClientProp($content->clientProprietaire);
        //$domain->setStatut($content->statut);
        $domain->setDateAct($content->date_cre);
        $domain->setDateFin($content->date_fin);
        $entityManager->flush();

        $data=[
            'id'=>$domain->getId(),
            'hebergeur'=>$domain->getHebergeur(),
            //'Statut'=>$domain->getStatut(),
            'date_cre'=>$domain->getDateAct(),
            'date_fin'=>$domain->getDateFin(),
             'clientProprietaire'=>$domain->getClientProp()
        ];
        return $this->json($data);

    }
#[Route('/domain/{id}', name:'api_delete',methods:['DELETE'])]
public function delete(ManagerRegistry $doctrine,$id):Response
{
    $entityManager=$doctrine->getManager();
    $domain=$entityManager
        ->getRepository(Domaine::class)
        ->find($id);
    if(!$domain){
        return $this->json("no such a domain".$id,404);
    }
    $entityManager->remove($domain);
    $entityManager->flush();
    return $this->json('Deleted a domain successfully with id ' . $id);

}
    #[Route('/domain/{id}',name:"api-show_domain",methods:['GET'])]
public function show(ManagerRegistry $doctrine,$id):Response
    {
        $domain = $doctrine
            ->getRepository(Domaine::class)
            ->find($id);
        if (!$domain){
            return $this->json('no domain found for id',$id,404);
        }
        $data=[
            'id'=>$domain->getId(),
            'hebergeur'=>$domain->getHebergeur(),
            //'Statut'=>$domain->getStatut(),
            'date_cre'=>$domain->getDateAct(),
             'clientProprietaire'=>$domain->getClientProp(),
            'date_fin'=>$domain->getDateFin(),
            'nom'=>$domain->getDomainName(),

        ];
        return $this->json($data);
    }



}